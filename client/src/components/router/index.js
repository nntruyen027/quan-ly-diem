import { Suspense, } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import React from 'react';

import { LoadingPage, NotFoundPage, } from '~/pages';
import { AdminAuthLayout,
  AdminMainLayout,
  StudentAuthLayout,
  ClassDetailLayout,
  TeacherAuthLayout,
  TeacherMainLayout,
  StudentMainLayout, } from '~/layouts';
import { studentAuthRoutes,
  adminAuthRoutes,
  adminMainRoutes,
  classDetailRoutes,
  teacherAuthRoutes,
  teacherMainRoutes,
  studentMainRoutes, } from '~/routes';

const Routing = () => (
  <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        {adminMainRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<AdminMainLayout>{element}</AdminMainLayout>}
          />
        ))}
        {teacherMainRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<TeacherMainLayout>{element}</TeacherMainLayout>}
          />
        ))}
        {studentAuthRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<StudentAuthLayout>{element}</StudentAuthLayout>}
          />
        ))}
        {studentMainRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<StudentMainLayout>{element}</StudentMainLayout>}
          />
        ))}
        {teacherAuthRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<TeacherAuthLayout>{element}</TeacherAuthLayout>}
          />
        ))}
        {adminAuthRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<AdminAuthLayout>{element}</AdminAuthLayout>}
          />
        ))}
        {classDetailRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<ClassDetailLayout>{element}</ClassDetailLayout>}
          />
        ))}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Suspense>
);

export default Routing;