import React from 'react';


// 仅支持俩层嵌套
const routers = [
    {
        path: '/App', component: React.lazy(() => import('../App')), children: []
    },
    {
        path: '/text', component: () => <p>嘤嘤嘤</p>,
        children: [
            {
                path: '/a', component: () => <p>我是text下的a</p>
            },
            {
                path: '/b', component: () => <p>我是text下的b</p>
            }
        ]
    },
    {
        path: '/404', component: () => <p>404</p>, children: []
    },
];

export default routers;
