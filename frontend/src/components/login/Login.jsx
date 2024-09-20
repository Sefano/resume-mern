import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../registration/reg.scss";
import { login, registration } from "../../api/userApi";
import { Navigate, NavLink } from "react-router-dom";

const Reg = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <>
      {isAuth && <Navigate to="/posts" />}
      <div className="reg">
        <div className="reg__header">Вход</div>

        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Введите почту..."
          className="reg__input"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Введите пароль..."
          className="reg__input"
        />
        <NavLink className="reg__text" to="/registration">
          Регистрация
        </NavLink>

        <button
          onClick={() => {
            dispatch(login(email, password));
          }}
          className="reg__btn"
        >
          Войти
        </button>
      </div>
    </>
  );
};

export default Reg;
