import { useCallback, useEffect, useState } from 'react';

const useTelegram = () => {
    const [tg, setTg] = useState(null);

    useEffect(() => {
        const telegram = window.Telegram.WebApp;
        telegram.ready();
        telegram.expand();
        setTg(telegram);
    }, []);

    // … остальной код без изменений
};

export default useTelegram; 