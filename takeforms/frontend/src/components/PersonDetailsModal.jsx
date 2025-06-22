// src/components/PersonDetailsModal.jsx
import React from 'react';
import TabNavigation from './TabNavigation';
import './PersonDetailsModal.css';

const PersonDetailsModal = ({ isOpen, onClose, personDetails }) => {
    if (!isOpen || !personDetails) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Detalhes da Consulta</h2>
                <TabNavigation personDetails={personDetails} />
            </div>
        </div>
    );
};

export default PersonDetailsModal;
