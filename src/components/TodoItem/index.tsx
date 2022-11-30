import React, {FC} from 'react';
import style from './TodoItem.module.scss'
import Button from "../Button";
import {TodoItemType} from '../../types'

const TodoItem: FC<TodoItemType> = ({title, completed, onDelete, onToggleDone}) => {
  return (
    <div className={`${style.item} ${completed ? style.completed : ''}`}>
      <span className={style.title}>
        {title}
      </span>
      <div className={style.buttonBlock}>
        <Button
          onClick={onDelete}
          type='button'
        >
          <i className="bi bi-trash"></i>
        </Button>
        <Button
          onClick={onToggleDone}
          type='button'
        >
          <i className="bi bi-exclamation"></i>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;