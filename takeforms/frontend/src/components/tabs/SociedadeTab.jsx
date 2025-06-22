// src/components/tab/SociedadeTab.jsx
import React from 'react';

const SociedadeTab = ({ socios }) => {
    if (!socios || socios.length === 0) return <p>Nenhuma informação societária disponível.</p>;

    return (
        <div>
            <h3>Sociedade / Sócios</h3>
            {socios.map((socio, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <p><strong>Nome:</strong> {socio.nome}</p>
                    <p><strong>CPF:</strong> {socio.cpf}</p>
                    <p><strong>Qualificação:</strong> {socio.qualificacao}</p>
                </div>
            ))}
        </div>
    );
};

export default SociedadeTab;
