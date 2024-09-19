import { v4 as uuid4, } from 'uuid';
import { adminRoutes, } from '~/configs/routes';
import { ClassDetailPage, AssignmentPage, } from '~/pages';
import React from 'react';

export default [
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.classDetail,
    element: <ClassDetailPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.classAssign,
    element: <AssignmentPage />,
  },
];