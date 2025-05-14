import useTelegram from './hooks/useTelegram';
import MainScreen from './components/MainScreen';
import './App.css';

function App() {
  const { tg } = useTelegram();

  const handleCreate = () => {
    alert('Открытие создания заметки');
  };

  return <MainScreen onCreate={handleCreate} />;
}

export default App;
