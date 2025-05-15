import React, { useState, useEffect } from 'react';
import useTelegram from './hooks/useTelegram';
import './App.css';
import MainScreen from './components/MainScreen';
import CreateNoteScreen from './components/CreateNoteScreen';

function App() {
  const { tg } = useTelegram();
  const [screen, setScreen] = useState('main');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!tg || !tg.CloudStorage) return;
    tg.CloudStorage.getItem('notes', (err, data) => {
      if (!err && data) {
        try {
          setNotes(JSON.parse(data));
        } catch (e) {
          console.error('Ошибка парсинга сохранённых заметок', e);
        }
      }
    });
  }, [tg]);

  const handleCreate = () => setScreen('create');
  const handleCancel = () => setScreen('main');
  const handleSave = (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    if (tg && tg.CloudStorage) {
      tg.CloudStorage.setItem('notes', JSON.stringify(newNotes));
    }
    setScreen('main');
  };

  // удаление заметки по индексу
  const handleDelete = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    if (tg && tg.CloudStorage) {
      tg.CloudStorage.setItem('notes', JSON.stringify(newNotes));
    }
  };

  return (
    <>
      {screen === 'main' && (
        <MainScreen
          notes={notes}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
      {screen === 'create' && (
        <CreateNoteScreen onCancel={handleCancel} onSave={handleSave} />
      )}
    </>
  );
}

export default App;
