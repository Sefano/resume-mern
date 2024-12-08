import React, { useContext, useEffect, useRef, useState } from "react";
import "./messages.scss";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../axios/axios";
import { io } from "socket.io-client";
import { hideLoader, showLoader } from "../../redux/reducers/loaderReducer";
import imgIcon from "../../icons/img-icon.svg";
import send from "../../icons/send.svg";
import { sendMessage } from "../../api/messageApi";
import ImgPopup from "./imagePopup/ImgPopup";

const Messages = ({ socket }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);

  const messageScrollRef = useRef(null);

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   if (isAuth) {
  //     const newSocket = io("http://localhost:1803", {
  //       withCredentials: true,
  //       query: {
  //         userId: user.id,
  //       },
  //     });
  //     setSocket(newSocket);

  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (socket === null) return;
  //   // socket.emit("addNewUser", user?.id);
  //   socket.on("getOnlineUsers", (users) => {
  //     // setOnlineUsers(users);
  //   });
  //   console.log(socket);
  // }, [socket]);

  const [avatar, setAvatar] = useState("");
  const [info, setInfo] = useState({});

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const handlePopup = (imgUrl) => {
    setModalImg(imgUrl);
    setIsModalOpen(true);
  };

  const getMessages = async () => {
    const response = await api.get(`/messages/dialogue/${id}`);
    console.log(response.data);
    setMessages(response.data);
  };

  const getContacts = async () => {
    const response = await api.get("messages/contacts");
    setContacts(response.data.contacts);
  };

  useEffect(() => {
    getMessages();
    getContacts();
    console.log(socket);
    // handleMessages();
    // return () => {
    //   unsubscribeMessages();
    // };
  }, [id]);

  useEffect(() => {
    handleMessages();
    return () => {
      unsubscribeMessages();
    };
  }, [getMessages]);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(showLoader());
    api
      .get(`/profile/${id}`)
      .then((res) => {
        setInfo(res.data);
        setAvatar(res.data.user.avatar);

        console.log(res.data);
      })
      .catch((error) => {
        alert("Не удалось получить информацию о профиле");
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, [id]);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const sendMessageHandler = async () => {
    try {
      const response = await api.post(
        `/messages/send/${id}`,
        {
          text,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setMessages([...messages, response.data]);
      setText("");

      // dispatch(sendMessage(id, text, formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messageScrollRef.current && messages) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessages = () => {
    if (!id) {
      return;
    }

    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
      console.log(message);
    });
  };

  const unsubscribeMessages = () => {
    socket.off("newMessage");
  };

  return (
    <div className="messages">
      <div className="messages__contacts">
        {contacts.map((contact, index) => (
          <div className="message__contacts-contact" key={index}>
            <img
              className="message__contacts-contact-img"
              src={`http://localhost:1803/upload/profile-photos/${contact.avatar}`}
              alt="contactImg"
            />
            <div className="message__contacts-contact-name">
              {contact.login}
            </div>
          </div>
        ))}
      </div>
      <div className="messages__window">
        <div className="messages__window__info">
          <img
            className="messages__window__info-image"
            src={`http://localhost:1803/upload/profile-photos/${avatar}`}
            alt=""
          />
          <div>{info.user && info.user.login}</div>
        </div>
        <span></span>
        <div className="messages__window-messages">
          {messages.map((message) => (
            <div
              className={"messages__window-messages_single"}
              key={message._id}
              style={{
                alignSelf:
                  message.sender._id === id ? "flex-start" : "flex-end",
              }}
              ref={messageScrollRef}
            >
              {/* <div
                className="messages__window-messages_single-author"
                style={{
                  textAlign: message.sender._id === id ? "right" : "left",
                }}
              >
                <img src="" alt="" />
                <div>{message.sender.login}</div>
              </div> */}

              {message.image && (
                <div className="messages__window-messages_single-attachment">
                  <img
                    src={`http://localhost:1803/${message.image}`}
                    alt="msgImg"
                    onClick={() => handlePopup(message.image)}
                  />
                  {/* <div>{message.text}</div> */}
                </div>
              )}
              <div
                className="messages__window-messages_single-message"
                style={{
                  textAlign: message.sender._id === id ? "right" : "left",
                }}
              >
                {message.text}
              </div>
              {/* {message?.image && <img src={} alt="msg" />} */}
            </div>
          ))}
        </div>

        <span></span>
        <div className="messages__window-input">
          <textarea
            className="messages__window-input-textarea"
            name="textarea"
            id="textarea"
            maxLength={600}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input
            type="file"
            name="image"
            id="imageInput"
            accept="image/png, image/gif, image/jpeg"
            className="messages__window-input-attachment"
            onChange={onImageChange}
          />
          <div className="messages__window-input_buttons">
            <label
              htmlFor="imageInput"
              className="messages__window-input_buttons-img"
            >
              <img src={imgIcon} alt="imgIcon" />
            </label>
            <label
              htmlFor="textarea"
              className="messages__window-input_buttons-text"
              onClick={() => sendMessageHandler()}
            >
              <img src={send} alt="send" />
            </label>
          </div>
        </div>
      </div>
      <ImgPopup
        isOpen={isModalOpen}
        imgUrl={modalImg}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Messages;
