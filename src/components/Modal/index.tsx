import React, {FC, SyntheticEvent} from 'react';
import style from './Modal.module.scss';
import cn from 'classnames';
import {ModalType} from '../../types'

export const Modal: FC<ModalType> = ({visibility, className, children, changeVisibility}) => {

  if (!visibility) {
    return null;
  }

  const handlerStopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  const closeModalHandler = () => {
    changeVisibility(false)
  }

  return (
    <div className={cn(style.modal, className)} onClick={closeModalHandler}>
      <div className={style.content} onClick={handlerStopPropagation}>
        <span className={style.close} onClick={closeModalHandler}>
          <i className="bi bi-x-lg"></i>
        </span>
        {children}
      </div>
    </div>
  );
};