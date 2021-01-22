const store: any = {}

export type Store = typeof store;

export const useManage = (state: Store, setState: any) => {
    /**
     * 测试组件Context共享数据
     * */
    const add = () => {
        state.count += 1;
        setState(state);
    }

    return {
        add
    }
}

export default {
    store,
    useManage
};
