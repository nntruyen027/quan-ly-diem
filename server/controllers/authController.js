const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

exports.register = async (req, res) => {
  const { username, fullname, birthday, phone, address, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({
      username,
      fullname,
      birthday,
      phone,
      address,
      email,
      isAdmin: false,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.secretKey, { expiresIn: config.expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token, data: user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.secretKey, { expiresIn: config.expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, fullname, birthday, phone, address, email } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) user.username = username;
    if (fullname) user.fullname = fullname;
    if (birthday) user.birthday = birthday;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (email) user.email = email;

    if (req.files?.['avatar']) {
      user.avatar = req.files?.['avatar'][0].filename; 
    }

    if (req.files?.['photos'] && req.files?.['photos'].length > 0) {
      const photos = req.files?.['photos'].map(file => file.filename);
      user.photos = [...user.photos, ...photos];
    }

    await user.save();
    res.json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = Date.now() + 3600000; 

    await user.save();

    const mailOptions = {
      to: email,
      from: config.emailUser,
      subject: 'Password Reset Verification Code',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Your verification code is: ${resetCode}\n\n` +
        `Please enter this code on the password reset page to complete the process.\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error: ', err);
        res.status(500).send('Error sending email');
      } else {
        res.status(200).json({ DataView: 'Verification code sent' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  const { photo } = req.params;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.photos.includes(photo)) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', photo); 
    fs.unlink(filePath, err => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to delete photo' });
      }
    });

    user.photos = user.photos.filter(p => p !== photo);
    await user.save();

    res.json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.googleCallback = async (req, res) => {
  let user = await User.findById(req.user.user.id);
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(payload, config.secretKey, { expiresIn: config.expiresIn }, (err, token) => {
    if (err) throw err;
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}' }, '*');
        window.close();
      </script>
    `);
  });
}
