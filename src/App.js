import React, { useState, useEffect } from 'react';
import LZString from 'lz-string';
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
    tg.CloudStorage.getItem('notes', (err, stored) => {
      if (err || !stored) return;
      try {
        // пытаемся разжать, иначе разбираем как JSON
        const raw = LZString.decompressFromUTF16(stored);
        setNotes(JSON.parse(raw || stored));
      } catch {
        // fallback на plain JSON
        try { setNotes(JSON.parse(stored)); } catch { }
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
      const raw = JSON.stringify(newNotes);
      const compressed = LZString.compressToUTF16(raw);
      tg.CloudStorage.setItem('notes', compressed, (err, ok) => {
        if (err || !ok) console.warn('CloudStorage setItem error:', err);
      });
    }
    setEditingIndex(null);
    setScreen('main');
  };
  const handleDelete = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    if (tg?.CloudStorage) {
      const raw = JSON.stringify(newNotes);
      const compressed = LZString.compressToUTF16(raw);
      tg.CloudStorage.setItem('notes', compressed);
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
