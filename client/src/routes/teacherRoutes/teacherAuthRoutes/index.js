import { v4 as uuid4, } from 'uuid';
import { authRoutes, } from '~/configs/routes';
import React from 'react';
import { ForgetPasswordPage, LoginPage, ResetPasswordPage, } from '~/pages';

export default [
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.teacherLogin,
    element: <LoginPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.forgotPassword,
    element: <ForgetPasswordPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.resetPassword,
    element: <ResetPasswordPage />,
  },
];
