const Class = require('../models/Class');
const User = require('../models/User');
const { getAllDocuments } = require('../utils/querryDocument');

exports.getAllClasses = async (req, res) => {
  let query

  if(req.query.search)
    query.name = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'name';
  getAllDocuments(Class, query, defaultField, req, res, [
    'homeroomTeacher'
  ]);
};

exports.getOneClass = async (req, res) => {
  try {
    const id = req.params.id;
    const classData = await Class.findById(id).populate('homeroomTeacher');
    
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ data: classData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {

  try {
    let classExists = await Class.findOne({ name: req.body.name });
    if (classExists) {
      return res.status(400).json({ error: 'Class already exists' });
    }

    const newClass = new Class({
      ...req.body
    });

    await newClass.save();
    res.status(201).json({ data: newClass });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, homeroomTeacher, students, gradeLevel } = req.body;

    const classData = await Class.findById(id);

    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    classData.name = name || classData.name;
    classData.homeroomTeacher = homeroomTeacher || classData.homeroomTeacher;
    classData.students = students || classData.students;
    classData.gradeLevel = gradeLevel || classData.gradeLevel;

    await classData.save();

    res.status(200).json({ data: classData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    await Class.findByIdAndDelete(id);

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStudentByClass = async (req, res) => {
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
    ],
    class: req.params.id,
  }

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res, [
    'class'
  ]);
}


exports.getAllStudentByNoClass = async (req, res) => {
  const query = {
    $or: [
      { isAdmin: { $exists: false } },
      { isAdmin: false },
    ],
    isTeacher: false,
    $or: [
      { class: { $exists: false } },
      { class: null },
    ],
  }

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res);
}