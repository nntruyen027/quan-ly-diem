import { v4 as uuid4, } from 'uuid';
import { adminRoutes, } from '~/configs/routes';
import { AdminPage, AdminProfilePage, StudentPage, SubjectPage, TeacherPage, ClassPage, AssignmentPage, AdminGradePage, } from '~/pages';
import React from 'react';

export default [
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.profile,
    element: <AdminProfilePage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.category.subject,
    element: <SubjectPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.admin,
    element: <AdminPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.teacher,
    element: <TeacherPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.student,
    element: <StudentPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.category.class,
    element: <ClassPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.teacherAsignment,
    element: <AssignmentPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.grade,
    element: <AdminGradePage />,
  },
];