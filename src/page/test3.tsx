import React, { useReducer } from "react";
import { useWatch, useVuex } from '../utils/hooks';

// 模拟wacth
export default () => {
    const [state, setState] = useReducer(s => s + 1 ,0);
    const { val, oldVal } = useWatch(state, (val, oldVal) => {
         console.log(val, oldVal);
         return {
             val,
             oldVal
         }
    });

    return (
        <>
            <Aa></Aa>
            <p>{ state } --- { val } { oldVal }</p>
            <button onClick={() => { setState() }}> 点我 </button>
            <div>我是测试3.0</div>
        </>
    );
}

const Aa = () => {
    const { fun, state} = useVuex();

    return (
        <>
            <p>{ state.count }</p>
            <button onClick={() => {
                fun.add()
            }}>莫挨老子</button>
        </>
    );
}
