export type State = object | null;

export type Listener = (location: Location) => void;

export interface Path {
    pathname: string;
    search: string;
    hash: string;
}

export interface Location<S extends State = State> extends Path {
    state: S;
}

// 存储 history.listen 回调
let listeners: any = [];

const routerCao =  ()  => {

    // 路由依赖收集
    const listen = (fn: Listener) => {
        listeners.push(fn);

        return function () {
            listeners = listeners.filter((listener: any) => listener !== fn);
        }
    }

    // 跳转
    const push = (to: string, state?: any) => {
        const location = pullAwayLocation(to, state);
        // 调用原生history改变路由
        window.history.pushState(state, '', to);
        // 执行用户传入的监听函数
        listeners.forEach((fn: any) => fn( location ));
    }

    // 抽离当前跳转路由;
    const pullAwayLocation = (to: string, state: any) => {
        const arr = to.split('?');

        return {
            pathname: arr[0],
            search: arr[1],
            state
        }
    }

    // 获取当前信息 state、pathname、search
    const Location = (): any => {
        const {state} = window.history;
        const { pathname, search } = window.location;

        return {
            state,
            pathname,
            search
        }
    }

    // 处理浏览器前进后退操作
    window.addEventListener('popstate', () => {
        let location = Location();
        listeners.forEach((fn: any) => fn(location));
    });

    return {
        listen,
        push,
        Location
    };
};

export default routerCao;
