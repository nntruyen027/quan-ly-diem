import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getGradesForClassAndSubjectStart, } from '~/redux/grade/slice';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { translate, } from '~/helpers';
import { getHomeroomStart, } from '~/redux/class/slice';
import { getAssignmentsByClassStart, } from '~/redux/assignment/slice';
import { GradeTableBySubject, } from '~/components';

const HomeroomGradePage = () => {

  const dispatch = useDispatch();
  const { grades, } = useSelector(state => state.grade);
  const { classroom, } = useSelector(state => state.class);
  const [ term, setTerm, ] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);
  const [subjectId, setSubjectId,] = React.useState('');
  const { assignments, } = useSelector(state => state.assignment);

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(() => {
    dispatch(getHomeroomStart());
  }, []);

  React.useEffect(() => {
    if(classroom)
      dispatch(getAssignmentsByClassStart({
        id: classroom?._id,
        query: {
          limit: 1000,
          page: 1,
        },
      }));
    if(assignments)
      setSubjectId(assignments?.[0]?.subject?._id);
  }, [classroom,]);

  React.useEffect(()=> {
    if(classroom)
      dispatch(getGradesForClassAndSubjectStart({
        classId: classroom?._id, subjectId, term, academicYear,
      }));
  }, [term, academicYear, classroom, subjectId,]);

  return (
    <div>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('grade-class')}</div>
        
      <div className='w-full flex gap-3 my-3'>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('subject')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={subjectId}
            label={translate('subject')}
            size='small'
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {assignments?.map((value, index) => (
              <MenuItem key={index} value={value?.subject?._id}>{value?.subject?.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
      <GradeTableBySubject data={grades}/>
    </div>
  );
};

HomeroomGradePage.propTypes = {

};

export default HomeroomGradePage;