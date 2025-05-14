import React from 'react';
import useTelegram from './hooks/useTelegram';
import './App.css';
import MainScreen from './components/MainScreen';

function App() {
    const { tg } = useTelegram();

    const handleCreate = () => {
        // TODO: здесь откроем экран создания заметки
        alert('Открытие создания заметки');
    };

    return <MainScreen onCreate={handleCreate} />;
}

export default App;