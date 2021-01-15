import React, { ReactNode } from 'react';
// import History from '@/router/react-router';
import styled from 'styled-components';
import { Button } from 'antd';
// import {BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

interface RouteProps {
    path: string;
    children: ReactNode;
    com: any;
}

const RouterCmr = ({ path, children, com }: RouteProps): any => {

    console.log(com)
    window.history.pushState({}, '', '/' + path);
    return com();
}

export default () => {

    return (
        <>
            <RouterCmr path="A" com={A}>123</RouterCmr>
        </>
    );
}

const A = () => {
    return (
        <p>caomingrui</p>
    )
}
