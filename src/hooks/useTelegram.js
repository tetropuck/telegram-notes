import { useCallback, useEffect, useState } from 'react';

const useTelegram = () => {
    const [tg, setTg] = useState(null);

    useEffect(() => {
        const telegram = window.Telegram.WebApp;
        telegram.ready();
        telegram.expand();
        setTg(telegram);
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