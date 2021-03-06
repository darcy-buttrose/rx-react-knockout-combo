/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
import TodoItem from "./TodoItem.react";
import NewTodoItem from "./NewTodoItem.react";
import state$ from "../Models/Model";
import {IState} from "../Models/IState";

interface ITodoAppProps { }
interface ITodoAppState { nextId:number; todos: List<ITask> }

export default class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props) {
        super(props);
        this.state = {
            nextId: 0,
            todos: List<Task>([
            ])
        }
        
        state$.subscribe((state:IState) => {
            this.setState({
                nextId: state.nextId,
                todos: state.todos
            })
        });
    };
    
    render() {
        let todoList = this.state.todos.map((task: Task) => {
            return <TodoItem key={task.Id} task={task} />
        });
        return  (<section id="main">
                    <ul id="todo-list">{todoList}</ul>
                    <NewTodoItem nextId={this.state.nextId} />
                </section>);
    }
}
