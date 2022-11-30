import React, {FC, useEffect} from 'react';
import Button from "../Button";
import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Login.module.scss';
import {PASSWORD_PATTERN} from "../../constant/constant";
import {login} from "../../api";
import {LoginType} from '../../types';

const Login: FC = () => {

  const navigate = useNavigate()

  const schema = yup.object().shape({
    login: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле')
  })

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
    defaultValues: {login: 'admin@admin.com', password: 'admin123'}
  })

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')
    if (isAuth) {
      navigate('/')
    }
  }, [])

  const onSubmit = handleSubmit(async (loginData) => {
    const isAuth = await login(loginData.login, loginData.password)
    if (isAuth) {
      navigate('/')
      localStorage.setItem('isAuth', JSON.stringify(isAuth))
    }
  })

  return (
    <div className={style.content}>
      <div className={style.innerContent}>
        <h2>Authorization</h2>
        <form onSubmit={onSubmit}>
          <div>
            <p>Login</p>
            <input
              type="text"
              {...register('login',
                {
                  required: true,
                  maxLength: 30,
                })}
            />
            {errors.login &&
							<span style={{color: "red"}}>
              *Login* is mandatory
              </span>
            }
            {errors.login
              && errors.login.type === "maxLength"
              && <span style={{color: "red"}}>
                Max length exceeded
            </span>
            }
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              {...register('password',
                {
                  required: true,
                  pattern: PASSWORD_PATTERN
                })}
            />
          </div>
          <Button className={style.loginBtn}>Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;