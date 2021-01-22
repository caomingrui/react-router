import React, {memo, useState} from "react";
import { useWhyDidYouUpdate } from 'ahooks';
import { useCreated, useMount, useMounted, useUpdata, useBooleans, useClickAways } from "../utils/hooks";

interface NavigationBarProps
{
    count:string;
}
const Test5 = (props: NavigationBarProps) => {
    const [da, setDa] = useState<number>(0);
    const [testBool] = useState<boolean>(false);
    const [ state, { toggle }] = useBooleans(testBool);
    const ref = useState<HTMLSpanElement | undefined | any>(["test", "test2"]);

    useClickAways(() => {
        console.log(123123)
    }, ref);

    useCreated(() => {
        console.log('created???');
        console.log(props)
    })

    useMount(() => {
        console.log('mount');
    });

    useMounted(() => {
        console.log('mounted');
    });

    useUpdata(da, () => {
        console.log('我跟新了？？？');
    });

    useWhyDidYouUpdate('Test5', { props });

    return (
        <>
            <button onClick={() => setDa(1)}>Click</button>
            <button onClick={() => {
                toggle(!state)
            }}>{ state }</button>
            <span id="test">
                <button type="button" onClick={() => {
                    console.log(ref)
                }}>123123</button>
            </span>
            { da }
            <p id="test2">123123</p>
        </>
    );
}

const Aa = () => {
    const [state, setData] = useState<any>('0');
    return (
        <>
            <button onClick={() => setData(111)}>click 嘤嘤嘤</button>
            <Test5 count={state}/>
        </>
    );
}

export default memo(Aa);
