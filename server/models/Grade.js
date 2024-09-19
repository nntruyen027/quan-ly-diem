  const mongoose = require('mongoose');

  const GradeSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    term: {
      type: String,
      enum: ['1', '2', '3'],
      default: '1',
      required: true,
    },
    academicYear: {
      type: String,
      default: '2024',
      required: true,
    },
    grades: {
      oralTests: [
        {
          score: { type: Number, min: 0, max: 10 },
          date: { type: Date, default: Date.now },
        }
      ],
      fifteenMinuteTests: [
        {
          score: { type: Number, min: 0, max: 10 },
          date: { type: Date, default: Date.now },
        }
      ],
      onePeriodTests: [
        {
          score: { type: Number, min: 0, max: 10 },
          date: { type: Date, default: Date.now },
        }
      ],
      finalExam: [
        {
          score: { type: Number, min: 0, max: 10 },
          date: { type: Date, default: Date.now },
        }
      ],
    },
    averageScore: {
      type: Number,
      default: 0,
    }
  }, { timestamps: true });

  GradeSchema.methods.calculateAverageScore = function() {
    const oralTests = this.grades.oralTests.map(test => test.score);
    const fifteenMinuteTests = this.grades.fifteenMinuteTests.map(test => test.score);
    const onePeriodTests = this.grades.onePeriodTests.map(test => test.score);
    const finalExam = this.grades.finalExam.map(test => test.score);

    const totalPoints = 
      oralTests.reduce((sum, score) => sum + score, 0) * 1 +
      fifteenMinuteTests.reduce((sum, score) => sum + score, 0) * 1 +
      onePeriodTests.reduce((sum, score) => sum + score, 0) * 2 +
      finalExam.reduce((sum, score) => sum + score, 0) * 3;

    const totalTests = 
      oralTests.length * 1 + 
      fifteenMinuteTests.length * 1 + 
      onePeriodTests.length * 2 + 
      finalExam.length * 3;

    this.averageScore = totalTests > 0 ? totalPoints / totalTests : 0;
    return this.averageScore;
  }

  const Grade = mongoose.model('Grade', GradeSchema);
  module.exports = Grade;
