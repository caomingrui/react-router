import { reactive } from "@vue/reactivity";

//测试 count ++
const changeCount = (): void => {
    state.count += 1;
}


// vue3.0特性 + react 测试版 1.0.0
export interface State {
    count: number
}

const state: State = reactive({
    count: 0
});


export const mutations = {
    changeCount
}


export const store = {
    state
}

export type Store = typeof store;
