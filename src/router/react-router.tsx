import { useLocation } from 'react-router-dom';

export default () => {
    // 存储 history.listen 回调
    let listeners: any = [];
    const listen = (fn: any) => {
        listeners.push(fn);
        return function () {
            listeners = listeners.filter((listener: any) => listener !== fn);
        }
    }

    // 跳转
    const push = (to: string, state?: any) => {
        // 分解 跳转信息
        const location = pullAwayLocation(to, state);
        // 调用原生history改变路由
        window.history.pushState(state, '', to);
        // 执行用户传入的监听函数
        listeners.forEach((fn: any) => fn( location ));
    }

    // 抽离to state;
    const pullAwayLocation = (to: string, state: any) => {
        const arr = to.split('?');

        return {
            pathname: arr[0],
            search: arr[1],
            state
        }
    }

    // 获取当前信息 state、pathname、search
    const Location = () => {
        const locaMess = window.location.href;
        const arr = locaMess.split('/');
        const { pathname, search, state } = useLocation();
        return {
            state,
            pathname,
            search
        }
    }

    return {
        listen,
        push,
        Location
    };
}
