import React, { useState } from 'react';
import ArrowIcon from '../assets/arrow.svg';
import './MainScreen.css';

const MainScreen = ({ notes, onCreate }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
              className={`note-card${expandedIndex === index ? ' expanded' : ''}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="note-title">{note.title}</div>
              {expandedIndex === index && (
                <div className="note-text">{note.text}</div>
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