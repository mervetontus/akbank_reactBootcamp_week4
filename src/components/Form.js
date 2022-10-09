
import React, { useState, useEffect } from 'react'

// icons from react icons kit
// main Icon component
import { Icon } from 'react-icons-kit'

// icons themselves
import { plus } from 'react-icons-kit/feather/plus'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { trash } from 'react-icons-kit/feather/trash'

//style
import './index.css'

// get todos from local storage
const getTodosFromLS = () => {
    const data = localStorage.getItem('Todos');
    if (data) {
        return JSON.parse(data)
    }
    else {
        return []
    }
}

export const Form = () => {

    // todo value state
    const [todoValue, setTodoValue] = useState('');

    // todos array of objects
    const [todos, setTodos] = useState(getTodosFromLS());


    // form submit event
    const handleSubmit = (e) => {
        e.preventDefault();

        // creating a ID for every todo
        const date = new Date();
        const time = date.getTime();

        // creating a todo object
        let todoObject = {
            ID: time,
            TodoValue: todoValue,
            completed: false
        }
        // updating todos state
        setTodos([...todos, todoObject]);
        // clearing input field
        setTodoValue('');
    }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(todos));

    }, [todos])

    // delete a todo
    const handleDelete = (id) => {

        const filtered = todos.filter((todo) => {
            return todo.ID !== id;
        })
        setTodos(filtered);
    }

    // edit form
    const [editForm, setEditForm] = useState(false);

    // id state
    const [id, setId] = useState();

    // handle edit icon
    const handleEdit = (todo, index) => {
        setEditForm(true);
        setId(index);
        setTodoValue(todo.TodoValue);
    }

    // handle edit submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let items = [...todos];
        let item = items[id];
        item.TodoValue = todoValue;
        // item.completed = false;
        items[id] = item;
        setTodos(items);
        setTodoValue('');
        setEditForm(false);
    }

    return (
        <>
            {editForm === false && (
                <div className="form">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <input type='text' placeholder="Add an Item" required
                                onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
                            <div>
                                <button type="submit">
                                    <Icon icon={plus} size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {editForm === true && (
                <div className="form">
                    <form autoComplete="off" onSubmit={handleEditSubmit}>
                        <div>
                            <input type='text' placeholder="Add an Item" required
                                onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
                            <div>
                                <button type="submit">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {todos.length > 0 && (
                <>
                    {todos.map((individualTodo, index) => (
                        <div className='todo' key={individualTodo.ID}>


                            <div>
                                {editForm === false && (
                                    <input type='checkbox' />
                                )}
                                <span>{individualTodo.TodoValue}</span>
                            </div>



                            {editForm === false && (
                                <div className='edit-and-delete'>

                                    <div style={{ marginRight: 7 + 'px' }}
                                        onClick={() => handleEdit(individualTodo, index)}>
                                        <Icon icon={edit2} size={18} />
                                    </div>

                                    <div onClick={() => handleDelete(individualTodo.ID)}>
                                        <Icon icon={trash} size={18} />
                                    </div>

                                </div>
                            )}

                        </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setTodos([])}
                        >DELETE ALL</button>
                    </div>

                </>
            )}

        </>
    )
}