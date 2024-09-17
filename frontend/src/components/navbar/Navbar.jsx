import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userReducer";
import { logout } from "../../api/userApi";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="navbar__element">
        <NavLink className="navbar__element-link" to="/">
          Главная
        </NavLink>
      </div>
      {isAuth && (
        <div className="navbar__login">
          <button
            className="navbar__element-logout"
            onClick={() => dispatch(logout())}
          >
            Выход
          </button>
        </div>
      )}
      {!isAuth && (
        <div className="navbar__login">
          <div className="navbar__element">
            <NavLink className="navbar__element-link" to="/login">
              Войти
            </NavLink>
          </div>
          <div className="navbar__element">
            <NavLink className="navbar__element-link" to="/registration">
              Регистрация
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
