import React from 'react';
import Modal from './Modal';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirmer l'action"}>
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚠️</div>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                    {message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button
                        className="cancel"
                        onClick={onClose}
                        style={{ padding: '10px 30px' }}
                    >
                        Non, annuler
                    </button>
                    <button
                        className="delete-btn-sm"
                        onClick={onConfirm}
                        style={{
                            padding: '10px 30px',
                            background: 'linear-gradient(90deg, #ff6b6b 0%, #ff4757 100%)',
                            color: 'white', border: 'none'
                        }}
                    >
                        Oui, continuer
                    </button>
                </div>
            </div>
        </Modal>
    );
}
