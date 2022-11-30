import React from "react";

export type FilterType = 'all' | 'done' | 'undone'

export type TodoType = {
  id: string,
  title: string,
  completed: boolean
}

export type ModalType = {
  children?: React.ReactNode;
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
  className?: string;
}

export type TodoItemType = {
  title: string
  completed: boolean
  onDelete: () => void
  onToggleDone: () => void
}

export type ModalAddTodoType = {
  isShowModal: boolean,
  setIsShowModal: (value: boolean) => void
}

export type LoginType = {
  login: string,
  password: string
}