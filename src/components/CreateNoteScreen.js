import React, { useState, useRef, useEffect } from 'react';
import './CreateNoteScreen.css';

const CreateNoteScreen = ({ onCancel, onSave, initialNote }) => {
    const [title, setTitle] = useState(initialNote?.title || '');
    const [text, setText] = useState(initialNote?.text || '');
    const titleRef = useRef(null);

    useEffect(() => {
        setTitle(initialNote?.title || '');
        setText(initialNote?.text || '');
    }, [initialNote]);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleBack = () => {
        // проверяем, были ли изменения в полях по сравнению с initialNote
        const initialTitle = initialNote?.title?.trim() || '';
        const initialText = initialNote?.text || '';
        const currentTitle = title.trim();
        const currentText = text;
        const hasChanges = currentTitle !== initialTitle || currentText !== initialText;
        if (!hasChanges) {
            onCancel();
            return;
        }
        if (window.confirm('Выйти без сохранения?')) {
            onCancel();
        }
    };

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title: title.trim(), text });
    };

    return (
        <div className="create-note-screen">
            <header className="cns-header">
                <button className="back-button" onClick={handleBack}>←</button>
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