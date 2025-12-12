import React, { useEffect } from 'react';
import './LegalModal.css';

const LegalModal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="legal-modal-overlay" onClick={onClose}>
            <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="legal-modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default LegalModal;
