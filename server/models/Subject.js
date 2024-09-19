const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gradeLevel: {
    type: Number,
    required: true,
    enum: [10, 11, 12]
  },
  description: {
    type: String,
    trim: true
  },
  numberOfOralTest: {  
    type: Number,
    required: true,
    default: 2,
  },
  numberOf15mTest: { 
    type: Number,
    required: true,
    default: 2,

  },
  numberOfOnePeriodTest: {  
    type: Number,
    required: true,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', SubjectSchema);
