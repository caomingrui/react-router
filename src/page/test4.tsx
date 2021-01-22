import React, {memo, useEffect, useState} from "react";
import axios from "../utils/request";

type Todo = {
    id: number,
    name: string,
    done?: boolean
};

type Todos = Todo[];

const Test4: React.FC = () => {
    const [todo, setTodo] = useState<Todo>({name: '', id: 0});
    const [, setTodos] = useState <Todos>([]);

    const refreshTodos = () => {
        // 这边必须手动声明axios的返回类型。
        axios.get<Todos>( "/index.json").then(res => {
            console.log(res)
        });
    };

    useEffect(() => {
        refreshTodos();
    }, [])

    return (
        <>
            <button onClick={() => {setTodo({
                id: 12312,
                name: 'caomingrui'
            })}}>莫挨老子</button>
            <p>{ todo.name }</p>
            <p>我是测试4.0</p>
        </>
    )
};



export default memo(Test4);
