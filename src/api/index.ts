import {FilterType, TodoType} from "../types";

const BASE_URL = "http://localhost:3001";

export const getTodos = async (): Promise<TodoType[]> => {
  return fetch(BASE_URL + '/todos', {
    mode: 'cors',
  }).then(res => res.json())
}

export const addTodo = async (title: string): Promise<TodoType> => {
  const newTodo: TodoType = {
    id: crypto.randomUUID(),
    title,
    completed: false
  }

  return fetch(BASE_URL + '/todos', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newTodo)
  }).then(res => res.json())
}

export const getFilteredTodos = async (value: FilterType): Promise<TodoType[]> => {
  let completed: string | boolean = ''
  if (value === 'done') {
    completed = `completed=true`
  }

  if (value === 'undone') {
    completed = `completed=false`
  }

  return fetch(BASE_URL + `/todos?${completed}`, {
    mode: 'cors',
  }).then(res => res.json())
}

export const onCompletedTask = async (task: TodoType): Promise<TodoType> => {
  return fetch(BASE_URL + `/todos/${task.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      ...task,
      completed: !task.completed
    })
  }).then(res => res.json())
}

export const onDeleteTask = async (id: string): Promise<TodoType[]> => {
  return fetch(BASE_URL + `/todos/${id}`, {
    method: 'DELETE',
    mode: 'cors',
  }).then(res => res.json())
}

export const login = async (login: string, password: string) => {
  try {
    const user = await fetch(BASE_URL + '/users' + `/${login}`, {
      mode: 'cors',
    }).then(res => res.json())

    return login === user.id && user.password === password
  } catch (e) {
    console.log(e)
    return false
  }
}