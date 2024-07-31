import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            // Проверяем, был ли клик внутри модального окна
            if (event.target.classList.contains(styles.overlay)) {
                onClose();
            }
        };

        // Добавляем обработчики событий
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);

        // Удаляем обработчики событий при размонтировании компонента или закрытии модалки
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.container}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
