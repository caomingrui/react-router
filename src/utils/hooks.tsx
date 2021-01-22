import {useEffect, useReducer, useRef} from "react";
import {Store} from "../store/vuex";
import {useGlobalData} from "./ContextState";

type Callback<T> = (val: T | undefined, oldVal: T | undefined) => T;

// 模拟观察者
export function useWatch<T>(da: T, callback: Callback<T> ) {
    const data = useRef<T>();
    useEffect(() => {
        data.current = da;
    })
    return callback(da, data.current);
}

// 强制组件更新
export const useUpdate = () => {
    const [,setCount] = useReducer(s => s + 1, 0);
    return setCount;
}


const reducer = (state: Store, action: Store): Store => {
    state = action
    return state
}

// Hooks context 共享数据
export const useVuex = () => {
    const { store, useManage } = useGlobalData();
    const [state, setState] = useReducer(reducer, store);

    const changeDa = JSON.parse(JSON.stringify( state ));
    return {
        fun: useManage(changeDa, setState),
        state
    }
}
