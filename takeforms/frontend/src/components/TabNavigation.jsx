// frontend/src/components/TabNavigation.jsx
import React from 'react';

function TabNavigation({ activeTab, onTabChange }) {
    return (
        <div className="tab-navigation">
            <button
                className={`tab-button ${activeTab === 'cpf' ? 'active' : ''}`}
                onClick={() => onTabChange('cpf')}
            >
                Buscar por CPF
            </button>
            <button
                className={`tab-button ${activeTab === 'nome' ? 'active' : ''}`}
                onClick={() => onTabChange('nome')}
            >
                Buscar por Nome
            </button>
            <button
                className={`tab-button ${activeTab === 'telefone' ? 'active' : ''}`}
                onClick={() => onTabChange('telefone')}
            >
                Buscar por Telefone
            </button>
        </div>
    );
}

export default TabNavigation;