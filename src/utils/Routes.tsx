
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

export enum Routes {
    index = '/',
    home= '/home',
    users= '/users',
}

export const pages = [
  {
    title: 'Users',
    children: [
      {
        href: Routes.users,
        title: 'Users',
        icon: <GroupsOutlinedIcon />
      },
    ]
  },
  {
    title: 'Products',
    children: [
      {
        href: '#',
        title: 'Products',
        icon: <GroupsOutlinedIcon />
      },
      {
        href: '#',
        title: 'Add Product',
        icon: <PersonAddAltIcon />
      },
    ]
  },

];
