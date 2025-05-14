import React from 'react';
import './MainScreen.css';

const MainScreen = ({ onCreate }) => {
    return (
        <div className="main-screen">
            <div className="empty-state">
                <p className="message">Для начала работы создайте свою первую заметку</p>
                <div className="arrow">↘</div>
            </div>
            <button className="create-button" onClick={onCreate}>+</button>
        </div>
    );
};

export default MainScreen; 