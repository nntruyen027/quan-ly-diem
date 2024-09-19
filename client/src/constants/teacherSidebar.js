import { v4 as uuid4, } from 'uuid';
import { translate, } from '~/helpers';
import { teacherRoutes, } from '~/configs/routes';

const sidebar = [
  {
    key: `teacher-side-bar-${uuid4()}`,
    label: translate('homeroom-class'),
    children: [
      {
        key: `teacher-side-bar-${uuid4()}`,
        label: translate('student-list'),
        path: teacherRoutes.homeroom,
      },
      {
        key: `teacher-side-bar-${uuid4()}`,
        label: translate('grade'),
        path: teacherRoutes.grades,
      },
      {
        key: `teacher-side-bar-${uuid4()}`,
        label: translate('rating'),
        path: teacherRoutes.viewRating,
      },
    ],
  },
  {
    key: `teacher-side-bar-${uuid4()}`,
    label: translate('assignment-class'),
    path: teacherRoutes.assignment,
  },
  {
    key: `teacher-side-bar-${uuid4()}`,
    label: translate('setting'),
    path: teacherRoutes.profile,
  },
];

export default sidebar;