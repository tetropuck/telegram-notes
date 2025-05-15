import React, { useState, useEffect } from 'react';
import useTelegram from './hooks/useTelegram';
import './App.css';
import MainScreen from './components/MainScreen';
import CreateNoteScreen from './components/CreateNoteScreen';

function App() {
  const { tg } = useTelegram();
  const [screen, setScreen] = useState('main');
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Загрузка заметок из облака
  useEffect(() => {
    if (!tg?.CloudStorage) return;
    tg.CloudStorage.getItem('notes', (err, data) => {
      if (!err && data) {
        try { setNotes(JSON.parse(data)); } catch { }
      }
    });
  }, [tg]);

  const handleCreate = () => {
    setEditingIndex(null);
    setScreen('create');
  };
  const handleCancel = () => {
    setEditingIndex(null);
    setScreen('main');
  };
  const handleSave = (note) => {
    let newNotes;
    if (editingIndex !== null) {
      newNotes = notes.map((n, i) => i === editingIndex ? note : n);
    } else {
      newNotes = [...notes, note];
    }
    setNotes(newNotes);
    if (tg?.CloudStorage) {
      tg.CloudStorage.setItem('notes', JSON.stringify(newNotes));
    }
    setEditingIndex(null);
    setScreen('main');
  };
  const handleDelete = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    if (tg?.CloudStorage) {
      tg.CloudStorage.setItem('notes', JSON.stringify(newNotes));
    }
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setScreen('create');
  };

  return (
    <>
      {screen === 'main' && (
        <MainScreen
          notes={notes}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {screen === 'create' && (
        <CreateNoteScreen
          onCancel={handleCancel}
          onSave={handleSave}
          initialNote={editingIndex !== null ? notes[editingIndex] : null}
        />
      )}
    </>
  );
}

export default App;
