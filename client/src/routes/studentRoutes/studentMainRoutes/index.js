import { v4 as uuid4, } from 'uuid';
import { studentRoutes, } from '~/configs/routes';
import { AboutSchoolPage, HomePage, StudentGradePage, StudentInfoPage, } from '~/pages';
import React from 'react';

export default [
  {
    id: `student-${uuid4()}`,
    path: studentRoutes.index,
    element: <HomePage/>,
  },
  {
    id: `student-${uuid4()}`,
    path: studentRoutes.home,
    element: <HomePage />,
  },
  {
    id: `student-${uuid4()}`,
    path: studentRoutes.grade,
    element: <StudentGradePage />,
  },
  {
    id: `student-${uuid4()}`,
    path: studentRoutes.info,
    element: <StudentInfoPage />,
  },
  {
    id: `student-${uuid4()}`,
    path: studentRoutes.aboutSchool,
    element: <AboutSchoolPage />,
  },
];