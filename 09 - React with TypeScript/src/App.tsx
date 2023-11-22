import React, { useState } from "react"
import { TodoList } from "./components/TodoList"
import { NewTodo } from "./components/NewTodo"
import { Todo } from "./todo.model"

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([{ id: "t1", text: "Finish the course" }])

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, { id: Math.random().toString(), text: text }])
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  };

  return (
    <>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </>
  )
}

export default App
