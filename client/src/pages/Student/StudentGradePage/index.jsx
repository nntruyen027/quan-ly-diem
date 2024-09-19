import { FormControl, InputLabel, MenuItem, Paper, Select, } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { translate, } from '~/helpers';
import { getMyGradesStart, } from '~/redux/grade/slice';
import GradeTable from './components/GradeTable';
import { getRatingForStudentStart, } from '~/redux/rating/slice';

const StudentGradePage = () => {
  const dispatch = useDispatch();
  const { grades, } = useSelector(state => state.grade);
  const { rating, } = useSelector(state => state.rating);

  const [ term, setTerm, ] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);

  const academicYears = Array.from({
    length: 5,
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(()=> {
    dispatch(getMyGradesStart({
      term, academicYear,
    }));
    dispatch(getRatingForStudentStart({
      term, academicYear,
    }));
  }, [term, academicYear,]);

  const conductDescriptions = {
    'T': 'Tốt',
    'K': 'Khá',
    'TB': 'Trung bình',
    'Y': 'Yếu',
  };

  const ratingDescriptions = {
    'G': 'Giỏi',
    'K': 'Khá',
    'TB': 'Trung bình',
    'Y': 'Yếu',
    'Kem': 'Kém',
  };

  return (
    <div>
      <div className='w-full flex gap-3 my-3'>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('term')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={term}
            label={translate('term')}
            size='small'
            onChange={(e) => setTerm(e.target.value)}
          >
            <MenuItem key={1} value={1}>{1}</MenuItem>
            <MenuItem key={2} value={2}>{2}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size='small' style={{
          marginBottom: '16px',
        }}>
          <InputLabel>{translate('academicYear')}</InputLabel>
          <Select
            labelId='academic-year-select-label'
            id='academic-year-select'
            value={academicYear}
            label={translate('academicYear')}
            size='small'
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            {academicYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {`${Number.parseInt(year)} - ${Number.parseInt(year)+1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Paper className='flex space-x-5 justify-center my-3 p-3'>
        <span>{translate('average-score')}:  {Number.parseFloat(rating?.averageScore)?.toFixed(2)}</span>
        <span>{translate('conduct')}: {conductDescriptions?.[rating?.conduct] || 'Chưa xếp loại'}</span>
        <span>{translate('rating')}: {ratingDescriptions?.[rating?.rating] || 'Chưa xếp loại'}</span>
      </Paper>
      <GradeTable data={grades}/>

    </div>
  );
};

export default StudentGradePage;