import ArrowIcon from '../assets/arrow.svg';
import React, { useState, useRef } from 'react';
import './MainScreen.css';

const MainScreen = ({ notes, onCreate, onDelete }) => {
  const [menuIndex, setMenuIndex] = useState(null);
  const touchTimer = useRef();

  const openMenu = (i) => setMenuIndex(i);
  const closeMenu = () => setMenuIndex(null);

  return (
    <div className="main-screen">
      {notes.length === 0 ? (
        <div className="empty-state">
          <p className="message">Для начала работы создайте свою первую заметку</p>
          <div className="arrow">
            <img src={ArrowIcon} alt="стрелка" className="arrow-icon" />
          </div>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note, index) => (
            <div
              key={index}
              className="note-card"
              onContextMenu={e => { e.preventDefault(); openMenu(index); }}
              onTouchStart={() => {
                touchTimer.current = setTimeout(() => openMenu(index), 600);
              }}
              onTouchEnd={() => clearTimeout(touchTimer.current)}
            >
              {note.title}
              {menuIndex === index && (
                <div className="note-menu">
                  <button
                    onClick={() => { onDelete(index); closeMenu(); }}
                  >
                    <span className="delete-icon">🗑</span>Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <button className="create-button" onClick={onCreate}>+</button>
    </div>
  );
};

export default MainScreen; 