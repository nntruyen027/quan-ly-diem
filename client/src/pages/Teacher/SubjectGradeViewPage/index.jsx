import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useNavigate, useParams, } from 'react-router-dom';
import { getGradesForClassAndSubjectStart, } from '~/redux/grade/slice';
import { Breadcrumbs, Button, FormControl, InputLabel, MenuItem, Select, Typography, } from '@mui/material';
import { translate, } from '~/helpers';
import { teacherRoutes, } from '~/configs/routes';
import { GradeTableBySubject, } from '~/components';

const SubjectGradeViewPage = () => {

  const dispatch = useDispatch();
  const { grades, } = useSelector(state => state.grade);
  const { classId, subjectId, } = useParams();
  const [ term, setTerm, ] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(()=> {
    dispatch(getGradesForClassAndSubjectStart({
      classId, subjectId, term, academicYear,
    }));
  }, [term, academicYear,]);

  const nav = useNavigate();

  return (
    <div>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl flex justify-between'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link className='no-underline text-gray-400' color='inherit' to={teacherRoutes.assignment}>
            {translate('assignment')}
          </Link>
          <Typography sx={{
            color: 'text.primary', 
          }}>{translate('grades-detail')}</Typography>
        </Breadcrumbs>
        <Button variant='contained' onClick={() => nav(`/teacher/${classId}/${subjectId}`)}>{translate('edit-score')}</Button>
      </div>
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
      <GradeTableBySubject data={grades}/>
    </div>
  );
};

SubjectGradeViewPage.propTypes = {

};

export default SubjectGradeViewPage;