    const mongoose = require('mongoose')

    const UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      fullname: {
        type: String, 
        required: true,
      },
      birthday: {
        type: Date,
      },
      phone: {
        type: String
      },
      address: [{
        type: String
      }],
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: function() {
          return !this.googleId;
        }
      },
      googleId: {
        type: String,
        default: null
      },
      avatar: {
        type: String,
        default: null
      },
      photos: [
        {
          type: String
        }
      ],
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      date: {
        type: Date,
        default: Date.now
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      isTeacher: {
        type: Boolean,
        default: false
      },
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
      },
      gender: {
        type: String,
      },
      father: {
        type: String,
      },
      fatherPhone: {
        type: String
      },
      mother: {
        type: String,
      },
      motherPhone: {
        type: String
      },
      note: {
        type: String
      }
    });

    module.exports = mongoose.model('User', UserSchema)