import React, { Component } from 'react';
import { TodoItem } from './ToDoItem'
import { AddTodoForm } from './AddTodoForm'
import { Modal, Button } from 'react-bootstrap'

export class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = { todos: [], loading: false, modal: { show: false, title: ""} };

        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        this.fetchTodos();        
    }

    render() {

        const contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.todos.map((item) => (
                <TodoItem todo={item} handleDelete={this.delete} />
              ));

        return (
            <div>
                <Modal backdrop="static"
                    keyboard={false}
                    centered={true}
                    onHide={() => this.handleModalClose()} show={this.state.modal.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modal.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleModalClose()}>Close </Button>
                    </Modal.Footer>
                </Modal>

                <AddTodoForm handleAddFormSubmit={(event) => this.handleAddFormSubmit(event)} />
                {contents}
            </div>
        )
    }

    handleModalClose() {
        this.setState({ modal: { showModal: false }});
    }

    handleAddFormSubmit(event) {
        event.preventDefault();

        if (!event.target[0].value) {
            event.stopPropagation();

            this.setState({ modal: { show: true, title: "Incorrect value", message: "Please enter valid task name" } });
            return;
        }

        const todo = { text: event.target[0].value };
        this.add(todo);

    }

    async add(todo) {
        await fetch('todo', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(committedTodo => {
            const updatedTodos = [...this.state.todos, committedTodo];
            this.setState({ todos: updatedTodos });

            document.getElementById("addTodoForm").reset();
        })
        .catch((error) => {
            this.setState({ modal: { showModal: true, message: "An Error occurred on adding. " + error } });
        });
    }

    async delete(id) {
        await fetch(`todo/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                const updatedTodos = [...this.state.todos].filter(i => i.id !== id);
                this.setState({ todos: updatedTodos });
            }
        })
        .catch((error) => {
            this.setState({ modal: { showModal: true, message: "An Error occurred on deleting. " + error } });
        });
    }

    async fetchTodos() {
        await fetch('todo').then(response => response.json())
            .then(todos => this.setState({ todos: todos }));
    }
    
}
