const TeachingAssignment = require('../models/TeachingAssignment');
const { getAllDocuments } = require('../utils/querryDocument');

exports.getAllTeachingAssignments = async (req, res) => {
  const query = {}; 
  const field = 'createdAt'; 
  const populate = ['teacher', 'class', 'subject'];
  
  getAllDocuments(TeachingAssignment, query, field, req, res, populate);
};


exports.getOneTeachingAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assignment = await TeachingAssignment.findById(id)
      .populate('teacher', 'fullname')
      .populate('class', 'className')
      .populate('subject', 'subjectName');
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json({ data: assignment });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.createTeachingAssignment = async (req, res) => {
  const { teacher, class: classId, subject } = req.body;

  try {
    const newAssignment = new TeachingAssignment({
      teacher,
      class: classId,
      subject
    });

    await newAssignment.save();
    res.status(201).json({ data: newAssignment });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeachingAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const { teacher, class: classId, subject } = req.body;

    const assignment = await TeachingAssignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.teacher = teacher || assignment.teacher;
    assignment.class = classId || assignment.class;
    assignment.subject = subject || assignment.subject;

    await assignment.save();

    res.status(200).json({ data: assignment });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeachingAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    await TeachingAssignment.findByIdAndDelete(id);

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getTeachingAssignmentByClass = async (req, res) => {
  const query = {
    class: req.params.classId
  }; 
  const field = 'createdAt'; 
  const populate = ['teacher', 'class', 'subject'];
  
  getAllDocuments(TeachingAssignment, query, field, req, res, populate);
}
