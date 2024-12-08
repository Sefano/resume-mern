import React from "react";
import "./imagepopup.scss";

const ImgPopup = ({ isOpen, imgUrl, onClose }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains("wrapper")) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="wrapper" onClick={handleClose}>
          <div className="imagePopup">
            <div className="imagePopup-image">
              <img
                className="imagePopup-image-img"
                src={`http://localhost:1803/${imgUrl}`}
                alt=""
              />
            </div>
          </div>
          <div onClick={onClose} className="close">
            X
          </div>
        </div>
      )}
    </>
  );
};

export default ImgPopup;
