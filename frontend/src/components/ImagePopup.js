import React, { useState } from "react";

function ImagePopup({ src }) {
  const [isLarge, setIsLarge] = useState(false);

  const toggleSize = () => setIsLarge((prev) => !prev);

  return (
    <div
      style={{
        position: isLarge ? "fixed" : "relative",
        top: isLarge ? "0" : "auto",
        left: isLarge ? "0" : "auto",
        width: isLarge ? "100vw" : "300px",
        height: isLarge ? "100vh" : "auto",
        backgroundColor: isLarge ? "rgba(0, 0, 0, 0.8)" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: isLarge ? 1000 : "auto",
        cursor: "pointer",
      }}
      onClick={toggleSize}
    >
      <img
        src={src}
        alt="Uploaded preview"
        style={{
          maxWidth: isLarge ? "90%" : "100%",
          maxHeight: isLarge ? "90%" : "300px",
          borderRadius: isLarge ? "0" : "10px",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
}

export default ImagePopup;
