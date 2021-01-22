import {useEffect, useReducer, useRef, useState} from "react";
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
    const [ state, setState ] = useReducer(reducer, store);

    const changeDa = JSON.parse(JSON.stringify( state ));
    return {
        fun: useManage( changeDa, setState ),
        state
    }
}


// 生命周期 初始化
type Callbacks<T> = () => void;
export function useCreated<T>(callback: Callbacks<T>): void {
    const [boolValue, setBoolValue] = useState<boolean>(false);

    useEffect(() => {
        if(boolValue) {
            setBoolValue(false);
            callback && callback();
        }
        setBoolValue(true);
    })
}


// 生命周期 组件挂载 触发一次
export function useMount<T>(callback: Callbacks<T>): void {
    useEffect(() => {
        callback && callback();
    },[])
}


// 生命周期 组件卸载 触发
export function useMounted<T>(callback: Callbacks<T>) {
    useEffect(() => {
        return () => callback && callback();
    },[])
}


// 生命周期 组件依赖跟新
export function useUpdata<T>(depend: T, callback: Callbacks<T>): void {
    const [boolValue, setBoolValue] = useState<boolean>(false);
    const Depend = Array.isArray(depend) ? [...depend] : [depend];

    useEffect(() => {
        if(boolValue) {
            setBoolValue(false);
            callback && callback();
        }
        setBoolValue(true);
    },Depend)
}


//模拟 ahooks useBoolean
type BooleanActions = {
    toggle: (boo: boolean | undefined) => void,
    setTrue: () => void,
    setFalse: () => void,
}

type BooleanBack = [
    state: boolean,
    BooleanActions: BooleanActions
]

export function useBooleans(boo: boolean = false): BooleanBack {
    const [state, setState] = useState<boolean>( boo );

    const toggle = (value: boolean = state) => {
        setState(value);
    }

    const setTrue = () => {
        setState(true);
    }

    const setFalse = () => {
        setState(false);
    }

    return [
        state,
        {
            toggle,
            setTrue,
            setFalse,
        }
    ];
}


// 模拟 Ahooks useClickAway 管理目标元素外点击事件的 Hook。
type TargetArray = [
    arr: string[],
    fn?: () => void,
] | any[]
export function useClickAways<T>(clickAway: MouseEvent | TouchEvent | any, target: string | string [], eventName?: string) {
    const event = eventName || 'click';

    useMount(() => {
        document.addEventListener(event, clickAway);
        console.log(target)
        let Targets: TargetArray = Array.isArray(target) ? target : [target];
        Targets[0].map((res: string) => {
            let dom: any = document.getElementById(res);
            dom.addEventListener(event, (e: any) => {
                e.stopPropagation();
            })
        });
    });

    useMounted(() => {
        document.removeEventListener<any>(event, clickAway);
    });
}
