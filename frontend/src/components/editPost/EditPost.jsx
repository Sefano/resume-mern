import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./createPost.scss";
import { useDispatch } from "react-redux";
import {
  createPost,
  editPost,
  getPosts,
  uploadPostImage,
} from "../../api/postApi";
import SimpleMDE from "react-simplemde-editor";
import "./easymdeStyles.css";

const EditPost = ({ isOpen, onClose, post }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setText(post.text);
    setImageUrl(post.image);
    console.log(post.image);
  }, [isOpen]);

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
      console.log(`dasdasdasdadssdaasd ${imageUrl}`);
    } catch (error) {
      console.log(error);
    }
  };

  const editPostHandler = () => {
    dispatch(editPost({ id: post._id, image: imageUrl, title, text }));
    onClose();
  };

  const handleClose = (e) => {
    if (e.target.classList.contains("wrapper")) {
      onClose();
    }
  };

  const onTextAreaChange = useCallback((value) => {
    setText(value);
    console.log(text);
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
              />
              <input
                type="text"
                autoFocus={true}
                className="popup__input popup__title"
                placeholder="Заголовок"
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={post.title}
              />

              <div className="edit">
                <SimpleMDE
                  onChange={onTextAreaChange}
                  value={text}
                  className="popup__text"
                />
              </div>

              <button
                className="popup__button"
                onClick={() => editPostHandler()}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
