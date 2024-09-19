/* eslint-disable react/prop-types */
import React, { useState, } from 'react';
import { TextField, Button, Grid, Typography, } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { createOrUpdateGradeStart as createGradeStart, } from '~/redux/grade/slice';

const GradeInputForm = ({ classId, subjectId, }) => {
  const dispatch = useDispatch();
  const [formData, setFormData,] = useState({
    studentId: '',
    scores: {
      oral_1: '',
      oral_2: '',
      oral_3: '',
      oral_4: '',
      oral_5: '',
      fifteenMinutes_1: '',
      fifteenMinutes_2: '',
      fifteenMinutes_3: '',
      fifteenMinutes_4: '',
      fifteenMinutes_5: '',
      oneHour_1: '',
      oneHour_2: '',
      exam: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGradeStart({
      classId, subjectId, ...formData, 
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6' gutterBottom>
        Nhập điểm
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Student ID'
            name='studentId'
            value={formData.studentId}
            onChange={(e) => setFormData({
              ...formData, studentId: e.target.value, 
            })}
            fullWidth
            required
          />
        </Grid>
        {Object.keys(formData.scores).map((key) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField
              label={key.replace('_', ' ')}
              name={key}
              value={formData.scores[key]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GradeInputForm;
