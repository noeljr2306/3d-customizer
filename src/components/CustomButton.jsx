import React from "react";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: "#6A5ACD",
        color: "white",
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: "#6A5ACD",
        color: "#6A5ACD",
      };
    }
  };

  return (
    <button
      className={`px-2 py-2 flex-1 cursor-pointer ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
