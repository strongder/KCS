// EmojiPicker.js
import React from 'react';
import './EmojiPicker.scss'

const emojiList = [
    '😀', '😃', '😄', '😁', '😆',
    '😅', '😂', '🤣', '😊', '😇',
    // Thêm nhiều emoji khác nếu cần
  ];
const EmojiPicker = ({ onSelect }) => {
  return (
    <div className="emoji-picker">
      {emojiList.map((emoji, index) => (
        <span key={index} onClick={() => onSelect(emoji)}>
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
