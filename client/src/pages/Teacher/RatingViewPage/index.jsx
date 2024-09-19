import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { translate, } from '~/helpers';
import { getHomeroomStart, } from '~/redux/class/slice';

import { RatingTableByClass, } from '~/components'; // Import the RatingTableByClass
import { getRatingsForClassStart, } from '~/redux/rating/slice';
import { useNavigate, } from 'react-router-dom';
import { teacherRoutes, } from '~/configs/routes';

const RatingViewPage = () => {
  const dispatch = useDispatch();
  const { ratings, } = useSelector(state => state.rating); // Assuming ratings data from state
  const { classroom, } = useSelector(state => state.class);
  const [term, setTerm,] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);

  const nav = useNavigate();

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(() => {
    dispatch(getHomeroomStart()); // Fetching homeroom information
  }, []);

  React.useEffect(() => {
    if (classroom)
      dispatch(getRatingsForClassStart({
        term, academicYear, classId: classroom?._id,
      }));
  }, [classroom, term, academicYear,]);

  return (
    <div>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl flex justify-between'>
        <span>{translate('rating-class')}</span>
        <Button variant='contained' onClick={() => nav(teacherRoutes.editRating)}>{translate('edit-conduct')}</Button>
      </div>

      <div className='w-full flex gap-3 my-3'>
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('term')}</InputLabel>
          <Select
            labelId='term-select-label'
            id='term-select'
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
                {`${Number.parseInt(year)} - ${Number.parseInt(year) + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <RatingTableByClass data={ratings} />
    </div>
  );
};

RatingViewPage.propTypes = {
};

export default RatingViewPage;
