import { v4 as uuid4, } from 'uuid';
import { authRoutes, } from '~/configs/routes';
import React from 'react';
import { LoginPage, } from '~/pages';

export default [
  {
    id: `student-${uuid4()}`,
    path: authRoutes.login,
    element: <LoginPage />,
  },
];