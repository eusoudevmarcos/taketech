// src/components/tab/ContatosTab.jsx
import React from 'react';

const ContatosTab = ({ contatos }) => {
    if (!contatos || contatos.length === 0) return <p>Nenhum contato disponível.</p>;

    return (
        <div>
            <h3>Contatos</h3>
            {contatos.map((contato, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                    <p><strong>Tipo:</strong> {contato.tipo}</p>
                    <p><strong>Valor:</strong> {contato.valor}</p>
                </div>
            ))}
        </div>
    );
};

export default ContatosTab;

