import React from "react";
import "./main.scss";
import nest from "../../icons/nest.png";
import express from "../../icons/express.png";
import mongodb from "../../icons/mongodb.svg";
import pg from "../../icons/pg.png";
import socketio from "../../icons/socketio.png";
import axios from "../../icons/axios.png";
import reactLogo from "../../icons/reactLogo.png";
import ts from "../../icons/ts.png";
import redux from "../../icons/redux.png";
import git from "../../icons/git.png";
import jest from "../../icons/jest.png";

const Main = () => {
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__wrapper-info">
          <p className="main__wrapper-info-desc">Работа с сервером</p>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={nest} alt="nest" />
            </div>
            <div className="stack-name">NestJs</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={express} alt="express" />
            </div>
            <div className="stack-name">ExpressJs</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={axios} alt="axios" />
            </div>
            <div className="stack-name">Axios</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={socketio} alt="socketio" />
            </div>
            <div className="stack-name">SocketIo</div>
          </div>
        </div>
        <div className="main__wrapper-info">
          <p className="main__wrapper-info-desc">Базы данных</p>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={mongodb} alt="mongodb" />
            </div>
            <div className="stack-name">MongoDB (mongoose)</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={pg} alt="pg" />
            </div>
            <div className="stack-name">PostgresSQL (sequelize)</div>
          </div>
        </div>
        <div className="main__wrapper-info">
          <p className="main__wrapper-info-desc">Фронтенд</p>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={reactLogo} alt="reactLogo" />
            </div>
            <div className="stack-name">React</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={redux} alt="redux" />
            </div>
            <div className="stack-name">Redux</div>
          </div>
        </div>
        <div className="main__wrapper-info">
          <p className="main__wrapper-info-desc">Дополнительные технологии</p>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={ts} alt="ts" />
            </div>
            <div className="stack-name">TypeScript</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={git} alt="git" />
            </div>
            <div className="stack-name">Git (в т.ч. GitHub)</div>
          </div>
          <div className="main__wrapper-info__stack">
            <div className="stack-img">
              <img src={jest} alt="jest" />
            </div>
            <div className="stack-name">Jest</div>
          </div>
        </div>
        <div className="main__wrapper-about">
          <p className="main__wrapper-info-desc">Дополнительные технологии</p>
          <p className="main__wrapper-info-text">
            Я являюсь NodeJs Backend разработчиком. Способен писать сервера с
            функционалом авторизации и аутентификации, еффективно работать с
            системой запрос-ответ, а так же внедрять базы данных.
          </p>
          <p className="main__wrapper-info-text">
            Знаю, как обеспечить безопасность сервера и данных, хранящихся на
            нем и в бд.
          </p>
          <p className="main__wrapper-info-text">
            Умею работать с гитом. Создавать ветки, объединять их, работать с
            версиями приложения.
          </p>
          <p className="main__wrapper-info-text">
            Понимаю TS и принципы типизирования.
          </p>
          <p className="main__wrapper-info-text">
            С нуля способен написать фронтенд часть с локальным
            Redux-хранилищем, а так же подключить axios для запросов на сервер.
          </p>
        </div>
        <div className="main__wrapper-about">
          <p className="main__wrapper-info-desc">О данном сайте</p>
          <p className="main__wrapper-info-text">
            <b>Фронтенд</b> часть реализована с помощью React, с использованием
            redux хранилища, для управления состоянием.
          </p>

          <br />
          <p className="main__wrapper-info-text">
            <b>Бэкенд</b> часть написана на ExpressJs. Сайт имеет функционал
            регистрации и аутентификации с двумя токенами, access и refresh.
          </p>
          <br />
          <p className="main__wrapper-info-text">
            Имеется функционал создания постов и их редактирования. Есть
            возможность ставить лайки и делать репосты, а так же оставлять
            комментарии.
          </p>
          <br />
          <p className="main__wrapper-info-text">
            Сервер работает с базой данных <b>MongoDB</b>.
          </p>
          <br />
          <p className="main__wrapper-info-text">
            При помощи <b>SocketIo</b> реализована функция отправки и получений
            сообщений в реальном времени (чаты). Для каждого диалога сосдается
            папка, в которую попадают изображения.
          </p>
          <br />
          <p className="main__wrapper-info-text">
            Поскольку проект является демонстрацией навыков, изображения
            (картинки постов и аватарки) хранятся не в облаке, а напрямую на
            сервере. Так же я не стал реализовывать функцию проверки email,
            чтобы не затруднять тех, кто решит протестировать функциона сайта.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
