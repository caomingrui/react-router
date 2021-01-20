import React, { memo } from "react";
import { useStore } from '../store/vueStore/store';
import { Store, mutations } from '../store/vueStore/index';

export default memo(() => {
    const data: any = useStore((store: Store) => {
        const { state } = store;
        const { count } = state;
        return {
            count
        }
    });

    return (
        <div>
            <button onClick={()=>{mutations.changeCount()}}>点我</button>
            <p>{ data.count }</p>
            <p>我是测试目标</p>
        </div>
    );
});
