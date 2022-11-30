import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import style from "../TodoList/TodoList.module.scss";
import Button from "../Button";
import {Modal} from "../Modal";
import mobxTask from "../../store/todo";
import {ModalAddTodoType} from "../../types";

const ModalAddTodo: FC<ModalAddTodoType> = ({isShowModal, setIsShowModal}) => {
  const [title, setTitle] = useState('')

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addTodo = async () => {
    if (title.trim().length) {
      await mobxTask.addTask(title)
      setTitle('')
    }
    setIsShowModal(false)
  }

  const onInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await addTodo()
    }
  }

  return (
    <div>
      <Modal className={style.modalBlock} visibility={isShowModal} changeVisibility={setIsShowModal}>
        <h2>Add Task</h2>
        <input type="text"
               value={title}
               onChange={changeTitleHandler}
               autoFocus
               onKeyDown={onInputKeyDown}
        />
        <Button onClick={addTodo} className={style.modalBtn}>Add Task</Button>
      </Modal>
    </div>
  );
};

export default ModalAddTodo;