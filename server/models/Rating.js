const mongoose = require('mongoose');
const Grade = require('./Grade'); 

const RatingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  conduct: {
    type: String,
    enum: ['T', 'K', 'TB', 'Y'], // T: Tốt, K: Khá, TB: Trung bình, Y: Yếu
    default: 'T',
    required: true,
  },
  rating: {
    type: String,
    enum: ['G', 'K', 'TB', 'Y', 'Kem'], // G: Giỏi, K: Khá, TB: Trung bình, Y: Yếu, Kem: Kém
    default: 'K',
    required: true,
  },
  averageScore: {
    type: Number,
    default: 0, // Điểm trung bình sẽ được tính tự động
  }
}, { timestamps: true });

RatingSchema.methods.calculateAverageScore = async function() {
  const grades = await Grade.find({
    student: this.student,
    term: this.term,
    academicYear: this.academicYear
  });

  if (grades.length === 0) {
    this.averageScore = 0;
    return this.averageScore;
  }

  let totalAverage = 0;
  let totalSubjects = grades.length; 

  grades.forEach(grade => {
    const subjectAverage = grade.calculateAverageScore(); 
    totalAverage += subjectAverage;
  });

  this.averageScore = totalSubjects > 0 ? totalAverage / totalSubjects : 0;
  return this.averageScore;
};


RatingSchema.methods.determineRating = async function() {

  await this.calculateAverageScore();

  if (this.conduct === 'T' && this.averageScore >= 8.0) {
    this.rating = 'G'; // Giỏi
  } else if (this.conduct !== 'Y' && this.averageScore >= 6.5) {
    this.rating = 'K'; // Khá
  } else if (this.averageScore >= 5.0) {
    this.rating = 'TB'; // Trung bình
  } else {
    this.rating = 'Y'; // Yếu
  }
  
  return this.rating;
};

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
