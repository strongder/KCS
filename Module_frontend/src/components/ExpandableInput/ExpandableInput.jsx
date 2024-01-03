// ExpandableInput.js
import React, { useState } from "react";
import './ExpandableInput.scss';

const ExpandableInput = ({ placeholder, maxRows = 5, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(1);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleInputRows(event.target.value); // Thay đổi từ event.target sang event.target.value
    onChange && onChange(event.target.value);
  };

  const handleInputRows = (value) => {
    const textareaLineHeight = 16;
    const newRows = Math.ceil((value.length * textareaLineHeight) / (window.innerWidth / 2)); // Thay đổi cách tính newRows
    setRows(newRows > maxRows ? maxRows : newRows);
  };

  return (
    <div className="input-container">
      <textarea
        value={inputValue}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ExpandableInput;
