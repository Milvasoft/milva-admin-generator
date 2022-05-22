
import MenuIcon from '@mui/icons-material/Menu';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import WebIcon from '@mui/icons-material/Web';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import OutboxIcon from '@mui/icons-material/Outbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ArticleIcon from '@mui/icons-material/Article';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BadgeIcon from '@mui/icons-material/Badge';
import { Routes } from './Routes';

const Pages = [
  {
    titleKey: 'routes.account',
    children: [
      {
        href: Routes.users,
        titleKey: 'routes.users',
        icon: <GroupsOutlinedIcon />,
        permission: 'SuperUser|UsersView'
      },
      {
        href: Routes.roles,
        titleKey: 'routes.roles',
        icon: <AdminPanelSettingsIcon />,
        permission: 'SuperUser|RolesView' 
      },
    ]
  },
  {
    titleKey: 'routes.events',
    children: [
      {
        href: Routes.eventDraft,
        titleKey: 'routes.eventDraft',
        icon: <OutboxIcon />,
        permission: 'SuperUser|EventRequestAdd'
      },
      {
        href: Routes.eventRequest,
        titleKey: 'routes.eventRequest',
        icon: <EventAvailableIcon />,
        permission: 'SuperUser|EventRequestsView'
      },
      {
        href: Routes.events,
        titleKey: 'routes.events',
        icon: <EventIcon />,
        permission: 'SuperUser|EventsView' 
      },
    ]
  },
  {
    titleKey: 'routes.settings',
    children: [
      {
        href: Routes.settings,
        titleKey: 'routes.settings',
        icon: <SettingsApplicationsIcon />,
        permission: 'SuperUser|GeneralSiteInfoView'
      },
      {
        href: Routes.socialMedias,
        titleKey: 'routes.socialMedias',
        icon: <ConnectWithoutContactIcon />,
        permission: 'SuperUser|GeneralSiteInfoView'
      },
      {
        href: Routes.qAs,
        titleKey: 'routes.qAs',
        icon: <LiveHelpIcon />,
        permission: 'SuperUser|GeneralSiteInfoView' 
      },
      {
        href: Routes.contracts,
        titleKey: 'routes.contracts',
        icon: <ArticleIcon />,
        permission: 'SuperUser|GeneralSiteInfoView' 
      }, 
      {
        href: Routes.staticPage,
        titleKey: 'routes.staticPage',
        icon: <FindInPageIcon />,
        permission: 'SuperUser|GeneralSiteInfoView' 
      },
    ]
  },
  {
    titleKey: 'routes.general',
    children: [
      {
        href: Routes.dashboard,
        titleKey: 'routes.dashboard',
        icon: <DashboardIcon />,
        permission: 'SuperUser|DashboardView' 
      },
      {
        href: Routes.menu,
        titleKey: 'routes.menu', 
        icon: <MenuIcon fontSize="small" />,
        permission: 'SuperUser|MenusView'
      },
      {
        href: Routes.pages,
        titleKey: 'routes.pages',
        icon: <WebIcon fontSize="small" />,
        permission: 'SuperUser|PagesView' 
      },
      {
        href: Routes.sliders,
        titleKey: 'routes.sliders',
        icon: <BurstModeIcon fontSize="small" />,
        permission: 'SuperUser|SlidersView'
      },
      {
        href: Routes.locations,
        titleKey: 'routes.locations',
        icon: <LocationOnIcon fontSize="small" />,
        permission: 'SuperUser|LocationsView' 
      },
      {
        href: Routes.categories,
        titleKey: 'routes.categories',
        icon: <CategoryIcon fontSize="small" />,
        permission: 'SuperUser|CategoriesView' 
      },
      {
        href: Routes.institutions,
        titleKey: 'routes.institutions',
        icon: <BusinessIcon fontSize="small" />,
        permission: 'SuperUser|InstitutionsView' 
      },
      {
        href: Routes.contactForms,
        titleKey: 'routes.contactForms',
        icon: <ContactMailIcon fontSize="small" />,
        permission: 'SuperUser|ContactFormsView' 
      },
    ]
  },
  {
    titleKey: 'routes.logs',
    children: [
      {
        href: Routes.logsAccount,
        titleKey: 'routes.accountLog',
        icon: <BadgeIcon />,
        permission: 'SuperUser|LogsView'
      },
      {
        href: Routes.logsUsers,
        titleKey: 'routes.users',
        icon: <GroupsOutlinedIcon />,
        permission: 'SuperUser|LogsView'
      },
      {
        href: Routes.logsRoles,
        titleKey: 'routes.roles',
        icon: <AdminPanelSettingsIcon />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsEvents,
        titleKey: 'routes.events',
        icon: <EventIcon />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsMenu,
        titleKey: 'routes.menu', 
        icon: <MenuIcon fontSize="small" />,
        permission: 'SuperUser|LogsView'
      },
      {
        href: Routes.logsPages,
        titleKey: 'routes.pages',
        icon: <WebIcon fontSize="small" />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsSliders,
        titleKey: 'routes.sliders',
        icon: <BurstModeIcon fontSize="small" />,
        permission: 'SuperUser|LogsView'
      },
      {
        href: Routes.logsLocations,
        titleKey: 'routes.locations',
        icon: <LocationOnIcon fontSize="small" />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsCategories,
        titleKey: 'routes.categories',
        icon: <CategoryIcon fontSize="small" />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsInstitutions,
        titleKey: 'routes.institutions',
        icon: <BusinessIcon fontSize="small" />,
        permission: 'SuperUser|LogsView' 
      },
      {
        href: Routes.logsSettings,
        titleKey: 'routes.settings',
        icon: <SettingsApplicationsIcon />,
        permission: 'SuperUser|LogsView'
      },
    ]
  },
  
];
  
export default Pages;

export type IPages = typeof Pages;
