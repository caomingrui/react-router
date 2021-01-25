import { useReducer, useRef, useEffect } from "react";
import { useGlobalState } from '../../utils/ContextState';
import {effect, ReactiveEffect, stop} from "@vue/reactivity";
import { useUpdate } from '../../utils/hooks';

type Selector<T, S> = (store: T) => S;
//
export const useStore = (callback: any) => {
    const store = useGlobalState();

    const updateTem = useUpdate();
    const effectBack = useEffectBack( () =>
        callback(store),
        {
            scheduler: job => {
                if (job() === undefined) return;
                updateTem();
            },
            lazy: true
        }
    );
    console.log(effectBack());
    return effectBack();
}

// 组件挂载后执行
const useEffectBack = (...param: Parameters<typeof effect>) => {
    const data = useRef<ReactiveEffect>();
    if (!data.current) {
        data.current = effect(...param);
    }

    const stopEffect = () => {
        stop(data.current!);
    }

    useEffect(() =>
        stopEffect
    , []);

    return data.current;
}
