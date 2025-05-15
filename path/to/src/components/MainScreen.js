import ArrowIcon from '../assets/arrow.svg';
import React from 'react';
import './MainScreen.css';

const MainScreen = ({ notes, onCreate }) => {
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
                    {notes.map((note, idx) => (
                        <div key={idx} className="note-card">
                            {note.title}
                        </div>
                    ))}
                </div>
            )}
            <button className="create-button" onClick={onCreate}>+</button>
        </div>
    );
};

export default MainScreen; 