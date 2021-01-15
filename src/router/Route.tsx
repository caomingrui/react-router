import React, { useState, useEffect, ReactNode } from 'react';
import History from '../router/react-router';

interface RouterContextProps {
    History: typeof History
};

export const RouterContext = React.createContext<RouterContextProps | null | any>(
    null,
);

export const Router: React.FC = ({ children }) => {
    const [location, setLocation] = useState(History().Location);

    useEffect(() => {
        const unlisten = History().listen((location: any) => {
            setLocation(location);
        });
        return unlisten;
    }, []);

    return (
        <RouterContext.Provider value={{ History, location }}>
            {children}
        </RouterContext.Provider>
    );
}
