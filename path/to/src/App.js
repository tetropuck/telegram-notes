import React, { useState, useEffect } from 'react';
import useTelegram from './hooks/useTelegram';
import './App.css';
import MainScreen from './components/MainScreen';
import CreateNoteScreen from './components/CreateNoteScreen';

function App() {
    const { tg } = useTelegram();
    const [screen, setScreen] = useState('main');
    const [notes, setNotes] = useState([]);

    // загрузка сохранённых заметок из Telegram CloudStorage
    useEffect(() => {
        if (!tg) return;
        tg.CloudStorage.getItem('notes', (err, data) => {
            if (!err && data) {
                try { setNotes(JSON.parse(data)); } catch { }
            }
        });
    }, [tg]);

    const handleCreate = () => setScreen('create');
    const handleCancel = () => setScreen('main');
    const handleSave = (note) => {
        const newNotes = [...notes, note];
        setNotes(newNotes);
        if (tg) tg.CloudStorage.setItem('notes', JSON.stringify(newNotes));
        setScreen('main');
    };

    return (
        <>
            {screen === 'main' && <MainScreen notes={notes} onCreate={handleCreate} />}
            {screen === 'create' && (
                <CreateNoteScreen onCancel={handleCancel} onSave={handleSave} />
            )}
        </>
    );
}

export default App;