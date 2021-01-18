import React, { memo } from "react";
import { useGlobalRoute } from '../utils/ContextState';

export default memo(() => {
    const { routerCao } = useGlobalRoute();

    const Jump = (path: string, state = {}) => {
        routerCao().push(path, state);
    }

    return (
        <p>
            <button onClick={() => {Jump('/text/a');}}>a</button>
            <button onClick={() => {Jump('/text/b');}}>b</button>
        </p>
    );
});
