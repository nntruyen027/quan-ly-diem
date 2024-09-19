const User = require('../models/User')
const Class = require('../models/Class')
const TeachingAssignment = require('../models/TeachingAssignment')
const { getAllDocuments } = require('../utils/querryDocument');
const bcrypt = require('bcryptjs');

exports.getAllStudent = async (req, res) => {

  const query = { 
    $and: [
      { 
        $or: [
          { isAdmin: { $exists: false } },
          { isAdmin: false },
        ],
      },
      { 
        $or: [
          { isTeacher: { $exists: false } },
          { isTeacher: false },
        ],
      },
    ]
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  if(req.query.class)
    query.class = req.query.class

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res, [
    'class'
  ]);
}


exports.getAllTeacher = async (req, res) => {

  const query = { 
    isTeacher: true
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res);
}

exports.getAllAdmin = async (req, res) => {

  const query = { 
    isAdmin: true,
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id
    
    const object = await User.findById(id)

    res.status(200).json({
      data: object
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getHomeroomClass = async (req, res) => {
  try {
    const id = req.user.id
    
    const homeroomTeacher = await User.findById(id)

    let students = []
    const object = await Class.findOne({homeroomTeacher: homeroomTeacher.id})
    if(object)
      students = await User.find({class: object._id}).populate('class')


    res.status(200).json({
      data: {
       ...object._doc,
       students
      },
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getAssignmentClasses = async (req, res) => {
  try {
    const id = req.user.id
    
    const teacher = await User.findById(id)
    const query = { 
      teacher: teacher.id
    };
  
    if(req.query.search)
      query.name = { $regex: req.query.search, $options: 'i' };
  
    const defaultField = 'name';
    getAllDocuments(TeachingAssignment, query, defaultField, req, res, ['class', 'subject', 'teacher']);
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.createOne = async (req, res) => {
  const { username, fullname, birthday, phone, address, email, password, isAdmin, isTeacher, className } = req.body;

  try {
    let user = await User.findOne({$or: [{ email }, {username}]});
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    data = {}
    if(birthday)
      data.birthday = birthday
    if(phone)
      data.phone = phone
    if(address)
      data.address = address
    if(isTeacher)
      data.isTeacher = isTeacher
    if(isAdmin)
      data.isAdmin = isAdmin
    if(className)
      data.class = className


    const newAdmin = new User({
      username,
      fullname,
      email,
      ...data
    });

    console.log(newAdmin)

    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(password, salt);

    await newAdmin.save();
    res.status(201).json({ data: newAdmin });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { isAdmin, isTeacher, className } = req.body;
    const id = req.params.id;
  

    const object = await User.findById(id);
  
    if (!object) {
      return res.status(404).json({ error: 'Not found' });
    }

    object.isAdmin = isAdmin 
    object.isTeacher = isTeacher 
    
    if(className) 
      object.class = className

    await object.save();

    res.status(200).json({ data: object });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id)

    res.status(204).send()
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}