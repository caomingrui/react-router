import React, { memo } from "react";
import { useGlobalRoute } from '../utils/ContextState';
import {useStore} from "../store/vueStore/store"

const TestCmr = () => {
    const { routerCao } = useGlobalRoute();
    const state = useStore((store: any) => {
        const { state } = store;
        const { count } = state;
        return {
            count
        }
    });

    console.log('我跟新了？？')
    const Jump = (path: string, state = {}) => {
        routerCao().push(path, state);
    }

    return (
        <p>
            <button>{ state.count }</button>
            <button onClick={() => {Jump('/text/a');}}>a</button>
            <button onClick={() => {Jump('/text/b');}}>b</button>
        </p>
    );
}

export default memo(() => {

    return (
        <>
            <TestCmr/>
        </>
    );
});
