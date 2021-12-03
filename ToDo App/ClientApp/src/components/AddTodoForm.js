import React, { Component } from 'react';

export class AddTodoForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form id="addTodoForm" onSubmit={this.props.handleAddFormSubmit}>
                    <label htmlFor="todo">Create todo: </label>
                    <input name="todo" type="text" placeholder="Create new todo" />
                </form>
            </div>
        );
    }
}
