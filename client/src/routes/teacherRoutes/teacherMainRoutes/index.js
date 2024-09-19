import { v4 as uuid4, } from 'uuid';
import { teacherRoutes, } from '~/configs/routes';
import { TeacherProfilePage, HomeroomClassPage, AssignmentClassPage, SubjectGradePage, StudentDetailPage, SubjectGradeViewPage, HomeroomGradePage, EditRatingPage, RatingViewPage, } from '~/pages';
import React from 'react';

export default [

  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.profile,
    element: <TeacherProfilePage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.homeroom,
    element: <HomeroomClassPage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.assignment,
    element: <AssignmentClassPage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.subjectGrade,
    element: <SubjectGradePage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.studentDetail,
    element: <StudentDetailPage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.subjectGradeView,
    element: <SubjectGradeViewPage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.grades,
    element: <HomeroomGradePage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.editRating,
    element: <EditRatingPage />,
  },
  {
    id: `teacher-${uuid4()}`,
    path: teacherRoutes.viewRating,
    element: <RatingViewPage />,
  },
];