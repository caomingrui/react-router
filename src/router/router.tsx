import React, {ReactNode, useEffect, useState} from "react";
import routerCao from "./react-router";
import {globalRouteState} from "../utils/ContextState";
import routers from "./index";

interface RouteProps {
    path: string;
    children?: ReactNode;
    component?: any;
}

export const RouterCmr = ({ path, children, component }: RouteProps): any => {
    const { pathname } = window.location;
    const matched = path === pathname;

    if (matched) {
        if (component) {
            return React.createElement(component);
        }
        else {
            return children;
        }
    }
    return null;
}

type GlobalRouterType = {
    children: ReactNode,
    routerDate: typeof routers
}

export const GlobalRouter = ({ children, routerDate }: GlobalRouterType) => {
    const [location, setLocation] = useState(routerCao().Location());

    useEffect(() => {
        console.log('挂载完成');
        routerCao().listen( location => {
            setLocation(location);
        });

        if (!isErro()) {
            routerCao().push('/404');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 是否重定向
    const isErro = (): boolean => {
        let state = false;
        routers.forEach((res: any) => {
            if (res.path === location.pathname) {
                state =  true;
            }
            if (res.children.length > 1) {
                res.children.forEach((item: any) => {
                    if (res.path + item.path === location.pathname) {
                        state =  true;
                    }
                })
            }
        })
        return state;
    }

    return (
        <globalRouteState.Provider value={{ routerCao, location }}>
            {
                routerDate.map((res: any) => {
                    return (
                        <div key={ res.path }>
                            <RouterCmr path={ res.path } component={ res.component }/>
                            {
                                    res.children.map((item: any) => {
                                        return (
                                            <RouterCmr path={ res.path + item.path } component={ item.component } key={ res.path + item.path }/>
                                        );
                                })
                            }
                        </div>
                    )
                })
            }
            { children }
        </globalRouteState.Provider>
    );
};
