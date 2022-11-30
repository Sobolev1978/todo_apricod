import {makeAutoObservable} from "mobx";
import {addTodo, getFilteredTodos, onCompletedTask, onDeleteTask} from "../api";
import {FilterType, TodoType} from "../types";

class Todo {

  todosMobx: TodoType[]  = []
  filterMobx: FilterType = 'all'

  constructor() {
    makeAutoObservable(this)
  }

  addTask = async (title: string) => {
    const newTodo = await addTodo(title)

    if(this.filterMobx === 'done') {
      return
    }

    this.todosMobx = this.todosMobx.concat([newTodo])
  }

  deleteTask = (id: string) => {
    this.todosMobx = this.todosMobx.filter((task) => task.id !== id)
  }

  onToggleDoneTask = (id: string) => {
    this.todosMobx = this.todosMobx.map((task) =>
      id === task.id ? {...task, completed: !task.completed} : task
    )
  }

  changeFilter = (filterValue: FilterType) => {
    this.filterMobx = filterValue
  }

  getFilteredTodos = async (value: FilterType) => {
    this.todosMobx = await getFilteredTodos(value)
  }

  onDeleteTask = async (id: string) => {
    await onDeleteTask(id)
     this.deleteTask(id)
  }

  onCompletedTask = async (task: TodoType) => {
   const upDateTask = await onCompletedTask(task)
    this.onToggleDoneTask(upDateTask.id)
  }

}

export default new Todo()