import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { getGradesForStudentStart, } from '~/redux/grade/slice';
import GradeTable from './components/GradeTable';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { translate, } from '~/helpers';

const StudentDetailPage = () => {
  const { studentId, } = useParams();

  const dispatch = useDispatch();
  const { grades, } = useSelector(state => state.grade);

  const [ term, setTerm, ] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(()=> {
    dispatch(getGradesForStudentStart({
      studentId, term, academicYear,
    }));
  }, [term, academicYear,]);

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
            label={translate('academic-year')}
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
      <GradeTable data={grades}/>
    </div>
  );
};

StudentDetailPage.propTypes = {

};

export default StudentDetailPage;