import React from 'react';
import axios from 'axios';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
      axios.get('http://localhost:3000/api/todos')
        .then(response => response.data)
        .then(todos => this.setState({ todos }))
        .catch(error => console.error(error.message));
    }

    handleAdd(title) {
        const todo = {
            id: this.nextId(),
            title,
            completed: false
        };

        const todos = [...this.state.todos, todo];

        this.setState({ todos });
    }

    handleDelete(id) {
        const todos = this.state.todos.filter(todo => todo.id !== id);

        this.setState({ todos });
    }

    handleToggle(id) {
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({ todos });
    }

    handleEdit(id, title) {
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }

            return todo;
        });

        this.setState({ todos });
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

                <section className="todo-list">
                    {this.state.todos.map(todo =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onDelete={this.handleDelete}
                            onToggle={this.handleToggle}
                            onEdit={this.handleEdit}
                        />)
                    }
                </section>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

export default App;
