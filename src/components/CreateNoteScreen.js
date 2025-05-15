import React, { useState, useRef, useEffect } from 'react';
import './CreateNoteScreen.css';

const CreateNoteScreen = ({ onCancel, onSave }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title: title.trim(), text });
    };

    return (
        <div className="create-note-screen">
            <header className="cns-header">
                <button className="back-button" onClick={onCancel}>←</button>
                <button
                    className="save-button"
                    onClick={handleSave}
                    disabled={!title.trim()}
                >
                    Готово
                </button>
            </header>
            <div className="cns-form">
                <input
                    ref={titleRef}
                    type="text"
                    className="title-input"
                    placeholder="Введите заголовок..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className="text-input"
                    placeholder="Текст заметки..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CreateNoteScreen; 