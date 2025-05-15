import React, { useState } from 'react';
import ArrowIcon from '../assets/arrow.svg';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import './MainScreen.css';
import useTelegram from '../hooks/useTelegram';

const MainScreen = ({ notes, onCreate, onDelete, onEdit }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { tg } = useTelegram();

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
                <>
                  <div className="note-text">{note.text}</div>
                  <div className="note-actions">
                    <EditIcon
                      className="action-icon edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(index);
                      }}
                    />
                    <DeleteIcon
                      className="action-icon delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        tg.showConfirm('Вы уверены, что хотите удалить заметку?', (ok) => {
                          if (ok) onDelete(index);
                        });
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        className={`create-button${expandedIndex !== null ? ' hidden' : ''}`}
        onClick={onCreate}
      >
        +
      </button>
    </div>
  );
};

export default MainScreen; 