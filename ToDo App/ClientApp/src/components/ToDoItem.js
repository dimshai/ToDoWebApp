import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

export class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = { inEdit: false, modal: { show: false, text: "", body: "" } };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...state, ...{ todo: props.todo } };
    }

    render() {

        const modal =
            <Modal backdrop="static"
                keyboard={false}
                centered={true}
                onHide={() => this.handleModalClose()} show={this.state.modal.show}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.modal.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.handleModalClose()}>Close </Button>
                </Modal.Footer>
            </Modal>;

        let content;
        if (this.state.inEdit) {
            content = [
                modal,
                <div key={this.state.todo.id} className="todo">
                    <input type="text" value={this.state.todo.text} onChange={(event) => this.updateInputValue(event)} />
                    <Button variant="primary" onClick={() => this.update()}>Update</Button>
                    <Button variant="secondary" onClick={() => this.handleEdit(false)}>Cancel</Button>
                </div>
            ];
        }
        else {

            let buttons;
            if (this.state.todo.completed === false) {
                buttons = [
                    <Button variant="primary" onClick={() => this.complete(this.state.todo)}>Complete</Button>,
                    <Button variant="primary" onClick={() => this.handleEdit(true)}>Edit</Button>
                ];
            }

            content = [
                modal,
                <div key={this.state.todo.id} className="todo">
                    <span style={{ textDecoration: this.state.todo.completed ? "line-through" : "" }}> {this.state.todo.text} </span>
                    {buttons}
                    <Button variant="danger" onClick={() => this.props.handleDelete(this.state.todo.id)}>Delete</Button>
                </div>
            ];
        }

        return content;
    }

    handleEdit(isInEdit) {
        this.setState({ inEdit: isInEdit });
    }

    handleModalClose() {
        this.setState({ modal: { show: false } });
    }

    updateInputValue(event) {
        if (!event.target.value) {
            this.setState({ modal: { show: true, title: "To do text is required", body: "Please type a valid to do text" } });
            return;
        }

        const todo = this.state.todo;
        todo.text = event.target.value;
        this.setState({ todo: todo });
    }

    async update() {
        await fetch(`todo`, {
            method: 'PATCH',
            body: JSON.stringify({ id: this.state.todo.id, text: this.state.todo.text }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.setState({ inEdit: false });
        })
        .catch((error) => {
            this.setState({ modal: { show: true, title:"Something went wrong", body: "An Error occurred on updating. " + error } });
        });
    }

    async complete(todo) {
        await fetch(`todo`, {
            method: 'PATCH',
            body: JSON.stringify({ id: this.state.todo.id, text: this.state.todo.text, completed: true }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            todo.completed = true;
            this.setState({ todo: todo });
        })
        .catch((error) => {
            this.setState({ modal: { show: true, title: "Something went wrong", body: "An Error occurred on competing. " + error } });
        });
    }

}
