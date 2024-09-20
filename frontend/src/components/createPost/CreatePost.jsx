import React, { useRef, useState } from "react";
import "./createPost.scss";
import { useDispatch } from "react-redux";

import { createPost, getPosts, uploadPostImage } from "../../api/postApi";

const CreatePost = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const inputImageRef = useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const response = await dispatch(uploadPostImage(formData));
      console.log(response.data.url);
      setImageUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = () => {
    dispatch(createPost(imageUrl, title, text));
    onClose();
  };

  const handleClose = (e) => {
    if (e.target.classList.contains("wrapper")) {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div className="wrapper" onClick={handleClose}>
          <div className="popup">
            <div className="popup__content">
              <button className="popup__close" onClick={() => onClose()}>
                X
              </button>
              <button
                onClick={() => inputImageRef.current.click()}
                className="popup__button"
              >
                Загрузить изображение
              </button>
              <input
                ref={inputImageRef}
                type="file"
                className="popup__input popup__file"
                onChange={handleChangeFile}
              />
              <input
                type="text"
                className="popup__input popup__text"
                placeholder="Заголовок"
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                name=""
                id=""
                className="popup__textarea popup__input"
                onChange={(e) => setText(e.target.value)}
                maxLength={5000}
              ></textarea>
              <button className="popup__button" onClick={() => addPost()}>
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
