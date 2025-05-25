import React, { useState, useRef, useEffect } from 'react';
import './CreateNoteScreen.css';

const CreateNoteScreen = ({ onCancel, onSave, initialNote }) => {
    const [title, setTitle] = useState(initialNote?.title || '');
    const [text, setText] = useState(initialNote?.text || '');
    const [toolbarOpen, setToolbarOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [boldActive, setBoldActive] = useState(false);
    const [italicActive, setItalicActive] = useState(false);
    const [underlineActive, setUnderlineActive] = useState(false);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        setTitle(initialNote?.title || '');
        setText(initialNote?.text || '');
        if (textRef.current) {
            textRef.current.innerHTML = initialNote?.text || '';
        }
    }, [initialNote]);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    // Обновляет состояние кнопок форматирования по текущей позиции курсора
    const updateActiveStates = () => {
        if (!textRef.current) return;
        setBoldActive(document.queryCommandState('bold'));
        setItalicActive(document.queryCommandState('italic'));
        setUnderlineActive(document.queryCommandState('underline'));
    };

    // Вставка ненумерованного списка с классом для стилизации
    const applyUnorderedListWithStyle = (styleClass) => {
        document.execCommand('insertUnorderedList');
        setTimeout(() => {
            // находим родительский UL и назначаем класс
            const sel = window.getSelection();
            let node = sel.anchorNode;
            while (node && node.nodeName !== 'UL') node = node.parentNode;
            if (node && node.classList) {
                node.classList.remove('bullet-list', 'dash-list');
                node.classList.add(styleClass);
            }
            textRef.current.focus();
            updateActiveStates();
        }, 0);
    };

    const execCmd = (command) => {
        document.execCommand(command);
        setTimeout(() => {
            textRef.current.focus();
            updateActiveStates();
        }, 0);
    };

    const handleInput = () => {
        setText(textRef.current.innerHTML);
    };

    // При нажатии Enter в заголовке фокусируемся на поле текста
    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textRef.current.focus();
        }
    };

    const handleBack = () => {
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
            <div className="toolbar">
                {/* Основная панель: Aa и кнопка списка */}
                {!toolbarOpen && !listOpen ? (
                    <>
                        <button
                            type="button"
                            className="toolbar-btn style-toggle"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => { setToolbarOpen(true); }}
                        >Aa</button>
                        <button
                            type="button"
                            className="toolbar-btn list-btn"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => { setListOpen(true); }}
                        >☰</button>
                    </>
                ) : toolbarOpen ? (
                    <>
                        {/* меню стилей текста */}
                        <button type="button" className="toolbar-btn bold-btn" style={{ backgroundColor: boldActive ? 'rgba(25, 118, 210, 0.2)' : 'transparent' }} onMouseDown={e => e.preventDefault()} onClick={() => execCmd('bold')}>B</button>
                        <button type="button" className="toolbar-btn italic-btn" style={{ backgroundColor: italicActive ? 'rgba(25, 118, 210, 0.2)' : 'transparent' }} onMouseDown={e => e.preventDefault()} onClick={() => execCmd('italic')}>I</button>
                        <button type="button" className="toolbar-btn underline-btn" style={{ backgroundColor: underlineActive ? 'rgba(25, 118, 210, 0.2)' : 'transparent' }} onMouseDown={e => e.preventDefault()} onClick={() => execCmd('underline')}>U</button>
                        <button
                            type="button"
                            className="toolbar-btn style-toggle"
                            onMouseDown={e => e.preventDefault()}
                            onClick={e => { e.preventDefault(); e.stopPropagation(); setToolbarOpen(false); setListOpen(false); textRef.current.focus(); }}
                        >Aa</button>
                    </>
                ) : (
                    <>
                        {/* меню списков */}
                        <button type="button" className="toolbar-btn numbered-btn" onMouseDown={e => e.preventDefault()} onClick={() => execCmd('insertOrderedList')}>1.</button>
                        <button type="button" className="toolbar-btn bullet-list-btn" onMouseDown={e => e.preventDefault()} onClick={() => applyUnorderedListWithStyle('bullet-list')}>•</button>
                        <button type="button" className="toolbar-btn dash-list-btn" onMouseDown={e => e.preventDefault()} onClick={() => applyUnorderedListWithStyle('dash-list')}>-</button>
                        <button
                            type="button"
                            className="toolbar-btn list-btn"
                            onMouseDown={e => e.preventDefault()}
                            onClick={e => { e.preventDefault(); e.stopPropagation(); setListOpen(false); setToolbarOpen(false); textRef.current.focus(); }}
                        >☰</button>
                    </>
                )}
            </div>
            <div className="cns-form">
                <input
                    ref={titleRef}
                    type="text"
                    className="title-input"
                    placeholder="Заголовок"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                />
                <div
                    ref={textRef}
                    className="text-input"
                    data-placeholder="Текст заметки..."
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={e => { handleInput(); updateActiveStates(); }}
                    onKeyUp={updateActiveStates}
                    onMouseUp={updateActiveStates}
                />
            </div>
        </div>
    );
};

export default CreateNoteScreen; 