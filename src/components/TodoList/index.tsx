import React, {useState, FC, useEffect} from 'react';
import Button from "../Button";
import TodoItem from "../TodoItem";
import style from './TodoList.module.scss'
import ButtonPanel from "../ButtonPanel";
import {observer} from 'mobx-react-lite';
import mobxTask from '../../store/todo'
import {useNavigate} from "react-router-dom";
import {TodoType} from "../../types";
import ModalAddTodo from "../ModalAddTodo";

const TodoList: FC = observer(() => {
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      mobxTask.getFilteredTodos(mobxTask.filterMobx)
    }, [mobxTask.filterMobx])

    useEffect(() => {
      const isAuth = localStorage.getItem('isAuth')
      if (!isAuth) {
        navigate('/login')
      }
    }, [])

    const deleteItem = async (id: string) => {
      await mobxTask.onDeleteTask(id)
    }

    const onToggleDone = async (task: TodoType) => {
      await mobxTask.onCompletedTask(task)
    }

    const openModalHandler = () => {
      setIsShowModal(true)
    }

    const completedTodosCount = mobxTask.todosMobx.filter((todo) => todo.completed).length

    return (
      <div className={style.todoContent}>
        <div className={style.headerPanel}>
          <Button className={style.addButton} onClick={openModalHandler}>Add</Button>
          <div className={style.buttonPanel}>
            <ButtonPanel/>
          </div>
        </div>

        <div className={style.todoList}>
          <ul>
            {
              mobxTask.todosMobx.map(({id, ...rest}) => (
                  <li key={id} className={style.item}>
                    <TodoItem
                      {...rest}
                      onDelete={() => deleteItem(id)}
                      onToggleDone={() => onToggleDone({id, ...rest})}
                    />
                  </li>
                )
              )
            }
          </ul>
        </div>

        {completedTodosCount > 0 && (
          <h2
            className={style.bottomTitle}>{`You have completed ${completedTodosCount} ${completedTodosCount > 1 ? 'todos' : 'todo'} `}</h2>
        )}

        <ModalAddTodo isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
      </div>
    );
  }
)

export default TodoList;