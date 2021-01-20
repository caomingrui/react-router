import React from "react";
import routerCao from '../router/react-router'

// 全局路由 start
interface RouterContextProps {
    routerCao: typeof routerCao;
    location: Location;
}

export const globalRouteState = React.createContext<RouterContextProps | any>(
    null,
);

export const useGlobalRoute = () => {
    const context = React.useContext(globalRouteState);
    if (context === undefined) {
        throw new Error('useGlobalRoute must be used within a globalRouteState');
    }
    return context;
};
// 全局路由 end


// 全局store 数据 start
const stateContext = React.createContext<any>(null);

export const useGlobalState = () => {
    const context = React.useContext(stateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a stateContext');
    }
    return context;
}

export const Provider = stateContext.Provider;
// 全局store 数据 end
