import React from 'react';
import { Breadcrumbs, Button, Container, Typography, } from '@mui/material';
import { GradeDataGrid, } from '~/components';
import { Link, useNavigate, useParams, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { teacherRoutes, } from '~/configs/routes';

const GradePage = () => {

  const { classId, subjectId, } = useParams();
  const nav = useNavigate();

  return (
    <div className='w-full'>
      <Container>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl flex justify-between'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className='no-underline text-gray-400' color='inherit' to={teacherRoutes.assignment}>
              {translate('assignment')}
            </Link>
            <Typography sx={{
              color: 'text.primary', 
            }}>{translate('edit-grades')}</Typography>
          </Breadcrumbs>
          <Button variant='contained' onClick={() => nav(`/teacher/${classId}/${subjectId}/grades`)}>{translate('view-score')}</Button>
        </div>
        {classId && subjectId && (
          <div className='w-full'>
            <GradeDataGrid classId={classId} subjectId={subjectId} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default GradePage;
