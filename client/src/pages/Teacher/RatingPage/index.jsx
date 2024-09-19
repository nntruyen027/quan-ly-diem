import React from 'react';
import { Button, Container, } from '@mui/material';
import { translate, } from '~/helpers';
import RatingDataGrid from './components/RatingDataGrid';
import { getHomeroomStart, } from '~/redux/class/slice';
import { useDispatch, useSelector, } from 'react-redux';
import { teacherRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

const EditRatingPage = () => {
  const dispatch = useDispatch();
  const { classroom, } = useSelector(state => state.class);
  const nav = useNavigate();

  React.useEffect(() => {
    dispatch(getHomeroomStart());
  }, []);

  return (
    <Container>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl flex justify-between'>
        <span>{translate('edit-rating-class')}</span>
        <Button variant='contained' onClick={() => nav(teacherRoutes.viewRating)}>{translate('view-rating')}</Button>
      </div>
      {classroom && <RatingDataGrid classId={classroom?._id} />}
    </Container>
  );
};

export default EditRatingPage;
