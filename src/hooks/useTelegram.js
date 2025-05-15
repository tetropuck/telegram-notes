import { useCallback, useEffect, useState } from 'react';

const useTelegram = () => {
    const [tg, setTg] = useState(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const telegram = window.Telegram.WebApp;
            telegram.ready();
            telegram.expand();
            setTg(telegram);
        } else {
            console.warn('Telegram WebApp SDK not found');
        }
    }, []);

    const onClose = useCallback(() => {
        if (tg) tg.close();
    }, [tg]);

    const onToggleMainButton = useCallback(() => {
        if (!tg) return;
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [tg]);

    return { tg, onClose, onToggleMainButton };
};

export default useTelegram; 