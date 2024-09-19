import { v4 as uuid4, } from 'uuid';
import { translate, } from '~/helpers';
import { adminRoutes, } from '~/configs/routes';

const sidebar = [
  {
    key: `side-bar-${uuid4()}`,
    label: translate('category'),
    children: [
      {
        key: `side-bar-${uuid4()}`,
        label: translate('subject'),
        path: adminRoutes.category.subject,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('class'),
        path: adminRoutes.category.class,
      },
    ],
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('student'),
    path: adminRoutes.student,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('teacher'),
    path: adminRoutes.teacher,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('admin'),
    path: adminRoutes.admin,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('grade'),
    path: adminRoutes.grade,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('setting'),
    path: adminRoutes.profile,
  },
];

export default sidebar;