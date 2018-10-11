import React from 'react';

function Stats(props) {
    const total = props.todos.length;
    const completed = props.todos.filter(todo => todo.completed).length;
    const uncompleted = total - completed;

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <th>Всего задач:</th>
                    <td>{total}</td>
                </tr>

                <tr>
                    <th>Выполнено:</th>
                    <td>{completed}</td>
                </tr>

                <tr>
                    <th>Осталось:</th>
                    <td>{uncompleted}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Stats;