
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

export enum Routes {
    index = '/',
    home= '/home',
    users= '/users',
}

export const pages = [
  {
    titleKey: 'users',
    children: [
      {
        href: Routes.users,
        titleKey: 'users',
        icon: <GroupsOutlinedIcon />
      },
    ]
  },
  {
    titleKey: 'products',
    children: [
      {
        href: '/home',
        titleKey: 'products',
        icon: <GroupsOutlinedIcon />
      },
      {
        href: '#',
        titleKey: 'add',
        icon: <PersonAddAltIcon />
      },
    ]
  },

];
