// ContextMenu.js
import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

const ContextMenu = ({ items, onMenuSelection, styles }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    // Apply the passed styles to the context menu
    if (menuRef.current && styles) {
      menuRef.current.style.top = styles.top;
      menuRef.current.style.right = styles.right;
      menuRef.current.style.bottom = styles.bottom;
      menuRef.current.style.left = styles.left;
    }
  }, [styles, menuRef]);

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#f0f0f0';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  const handleClick = (e, item) => {
    console.log(`Clicked on ${item.name}`);
    if(onMenuSelection(item)) {
      e.stopPropagation();
    }
  };

  return (
    <div className="context-menu-container" ref={menuRef}>
      {items.map((item, index) => (
        <div
          key={index}
          className="context-menu-item"
          onClick={(e) => handleClick(e, item)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
