import React from 'react';


// 仅支持俩层嵌套
const routers = [
    {
        path: '/App', component: React.lazy(() => import('../App')), children: []
    },
    {
        path: '/text', component: () => <p>嘤嘤嘤</p>, // 针对假路由 实现
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
        path: '/test', component: React.lazy(() => import('../page/test2')), children: [] // 针对vue3.0 双向绑定
    },
    {
        path: '/test3', component: React.lazy(() => import('../page/test3')), children: [] // 针对useContext 共享值 以及 useWatch
    },
    {
        path: '/test4', component: React.lazy(() => import('../page/test4')), children: [] // 针对ts安全应用
    },
    {
        path: '/404', component: () => <p>404</p>, children: []
    },
];

export default routers;
