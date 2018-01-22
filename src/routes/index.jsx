import Login from 'container/Login';
import Home from 'container/Home';

import UserList from 'container/UserList';
import AuthorizationList from 'component/authorization/AuthorizationList';
import TodoDemo from 'container/TodoDemo';

export const constantRoutes = [{
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/',
        component: Home,
        exact: true
    }
];


export const asyncRoutes = routes: [{
        path: '/user',
        component: UserList
    },
    {
        path: '/authorization',
        component: AuthorizationList
    },
    {
        path: '/todoDemo',
        component: TodoDemo
    }
]