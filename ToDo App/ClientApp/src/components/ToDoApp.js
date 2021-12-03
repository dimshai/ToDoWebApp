import React, { Component } from 'react';
import { TodoList } from './ToDoList';

export class TodoApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="todoList">
                <TodoList />
            </div>
        )
    }

}
