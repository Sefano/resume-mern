import React, { useCallback, useMemo, useRef, useState } from "react";
import "./createPost.scss";
import { useDispatch } from "react-redux";
import { createPost, getPosts, uploadPostImage } from "../../api/postApi";
import SimpleMDE from "react-simplemde-editor";
import "./easymdeStyles.css";

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

  const onTextAreaChange = useCallback((value) => {
    setText(value);
  }, []);

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
              {imageUrl && (
                <img src={`http://localhost:1803/${imageUrl}`} alt="" />
              )}

              <input
                ref={inputImageRef}
                type="file"
                className="popup__input popup__file"
                onChange={handleChangeFile}
                accept="image/png, image/gif, image/jpeg"
              />

              <input
                type="text"
                autoFocus={true}
                className="popup__input popup__title"
                placeholder="Заголовок"
                minLength={3}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="edit">
                <SimpleMDE
                  onChange={onTextAreaChange}
                  value={text}
                  className="popup__text"
                />
              </div>

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
