
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { i18n } from 'next-i18next';

export enum Routes {
    index = '/',
    home= '/home',
    users= '/users',
}

export const pages = [
  {
    title: i18n?.t('users'),
    children: [
      {
        href: Routes.users,
        title: i18n?.t('users'),
        icon: <GroupsOutlinedIcon />
      },
    ]
  },
  {
    title: i18n?.t('products'),
    children: [
      {
        href: '#',
        title: i18n?.t('products'),
        icon: <GroupsOutlinedIcon />
      },
      {
        href: '#',
        title: i18n?.t('add'),
        icon: <PersonAddAltIcon />
      },
    ]
  },

];
