import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import style from './Button.module.scss'
import cn from 'classnames'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<DefaultButtonPropsType> = ({className, children, ...restProps}) => {
  return (
    <button
      className={cn(className, style.button)}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;