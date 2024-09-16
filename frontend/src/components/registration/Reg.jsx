import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./reg.scss";
import { registration } from "../../api/userApi";

const Reg = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="reg">
      <div className="reg__header">Регистрация</div>
      <input
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
        }}
        type="text"
        placeholder="Введите логин..."
        className="reg__input"
      />
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
      <button
        onClick={() => {
          dispatch(registration(login, email, password));
        }}
        className="reg__btn"
      >
        Зарегестрироваться
      </button>
    </div>
  );
};

export default Reg;
