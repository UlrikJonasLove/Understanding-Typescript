import React, { useRef } from 'react';
import './NewTodo.css';

interface NewTodoProps {
    onAddTodo: (todoText: string) => void; // function type

}
export const NewTodo: React.FC<NewTodoProps> = props => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value; // ! makes sure that the value is not null, will only be called when the form is submitted
        props.onAddTodo(enteredText)
        textInputRef.current!.value = '';
    };

    return <form onSubmit={todoSubmitHandler}>
        <div className="form-control">
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textInputRef} />
        </div>
        <button type="submit">Add Todo</button>
    </form>;
}