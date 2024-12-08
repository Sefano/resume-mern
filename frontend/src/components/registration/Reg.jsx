import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./reg.scss";
import { registration } from "../../api/userApi";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Reg = () => {
  // const [login, setLogin] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const { login, email, password } = data;
    dispatch(registration(login, email, password));
    console.log(data);
  };

  return (
    <div className="reg">
      <div className="reg__header">Регистрация</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("login", {
            required: "Необходимо ввести логин!",
            minLength: {
              value: 2,
              message: "Логин должен содержать от 2 до 18 символов",
            },
            maxLength: {
              value: 18,
              message: "Логин должен содержать от 2 до 18 символов",
            },
          })}
          // value={login}
          // onChange={(e) => {
          //   setLogin(e.target.value);
          // }}
          type="text"
          placeholder="Введите логин..."
          className="reg__input"
        />
        <div className="reg__header-error">
          {errors?.login && <p>{errors?.login?.message || "Ошибка"}</p>}
        </div>
        <input
          {...register("email", {
            required: "Необходимо ввести почту!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат почты!",
            },
          })}
          // value={email}
          // onChange={(e) => {
          //   setEmail(e.target.value);
          // }}
          type="text"
          placeholder="Введите почту..."
          className="reg__input"
        />
        <div className="reg__header-error">
          {errors?.email && <p>{errors?.email?.message || "Ошибка"}</p>}
        </div>
        <input
          {...register("password", {
            required: "Необходимо ввести пароль!",
            minLength: {
              value: 8,
              message: "Пароль должен содержать от 8 до 30 символов",
            },
            maxLength: {
              value: 30,
              message: "Пароль должен содержать от 8 до 30 символов",
            },
          })}
          // value={password}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          // }}
          type="password"
          placeholder="Введите пароль..."
          className="reg__input"
        />
        <div className="reg__header-error">
          {errors?.password && <p>{errors?.password?.message || "Ошибка"}</p>}
        </div>
        <NavLink className="reg__text" to="/login">
          Войти
        </NavLink>
        <button type="submit" className="reg__btn" disabled={!isValid}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};

export default Reg;
