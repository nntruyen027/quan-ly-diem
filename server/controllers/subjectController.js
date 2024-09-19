const Subject = require('../models/Subject');
const { getAllDocuments } = require('../utils/querryDocument');

exports.getAllSubjects = async (req, res) => {
  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }

  const defaultField = 'name';
  getAllDocuments(Subject, query, defaultField, req, res);
}

exports.getOneSubject = async (req, res) => {
  try {
    const id = req.params.id;
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    res.status(200).json({ data: subject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.createSubject = async (req, res) => {
  const { name, gradeLevel, description, numberOf15mTest, numberOfOnePeriodTest, numberOfOralTest } = req.body;

  try {

    const newSubject = new Subject({
      name,
      gradeLevel,
      description,
      numberOfOnePeriodTest,
      numberOf15mTest,
      numberOfOralTest
    });


    await newSubject.save();
    res.status(201).json({ data: newSubject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gradeLevel, description, numberOf15mTest, numberOfOnePeriodTest, numberOfOralTest } = req.body;

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    subject.name = name || subject.name;
    subject.gradeLevel = gradeLevel || subject.gradeLevel;
    subject.description = description || subject.description;
    subject.numberOf15mTest = numberOf15mTest || subject.numberOf15mTest;
    subject.numberOfOralTest = numberOfOralTest || subject.numberOfOralTest;
    subject.numberOfOnePeriodTest = numberOfOnePeriodTest || subject.numberOfOnePeriodTest

    await subject.save();

    res.status(200).json({ data: subject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteSubject = async (req, res) => {
  try {
    const id = req.params.id;
    await Subject.findByIdAndDelete(id);

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};
