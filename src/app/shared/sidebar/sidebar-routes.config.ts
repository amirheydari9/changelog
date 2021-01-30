import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '',
        title: 'مدیریت کاربر',
        icon: 'ft-user',
        class: 'has-sub',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
            {
                path: '/user/users-list',
                title: 'لیست کاربران',
                icon: 'ft-users',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: [],
                roles: ['TebyanAdmin', 'PanelAdmin']
            },
        ],
        roles: ['TebyanAdmin', 'PanelAdmin']
    },
    {
        path: '',
        title: 'مدیریت معرف ازدواج',
        icon: 'ft-user',
        class: 'has-sub',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
            {
                path: '/agent/agents-list',
                title: 'لیست معرف های ازدواج',
                icon: 'ft-users',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: [],
                roles: ['TebyanAdmin', 'PanelAdmin']
            },
        ],
        roles: ['TebyanAdmin', 'PanelAdmin']
    },
    {
        path: '',
        title: 'مدیریت پیشنهاد ها',
        icon: 'ft-user',
        class: 'has-sub',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
            {
                path: '/suggestion/suggestions-list',
                title: 'لیست پیشنهاد ها',
                icon: 'ft-users',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: [],
                roles: ['TebyanAdmin', 'PanelAdmin']
            },
            {
                path: '/suggestion/ready-to-assign-suggestions-list',
                title: 'پیشنهاد های قابل تخصیص',
                icon: 'ft-users',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: [],
                roles: ['TebyanAdmin', 'PanelAdmin', 'Agent']
            },
            {
                path: '/suggestion/my-suggestions-list',
                title: 'تخصیص های من',
                icon: 'ft-users',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: [],
                roles: ['TebyanAdmin', 'PanelAdmin', 'Agent']
            },
        ],
        roles: ['TebyanAdmin', 'PanelAdmin', 'Agent']
    },
];
