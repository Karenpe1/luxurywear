import React, { useState } from "react";

const HeartButton = ({ className }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  return (
    <>
      <button
        onClick={toggleLike}
        className={className}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {liked ? (
          <i
            className="fas fa-heart"
            style={{ color: "red", fontSize: "22px" }}
          ></i>
        ) : (
          <i
            className="far fa-heart"
            style={{ color: "black", fontSize: "22px" }}
          ></i>
        )}
      </button>
    </>
  );
};

export default HeartButton;
