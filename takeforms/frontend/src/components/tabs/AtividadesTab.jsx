// src/components/tab/AtividadesTab.jsx
import React from 'react';

const AtividadesTab = ({ atividades }) => {
    if (!atividades || atividades.length === 0) return <p>Nenhuma atividade registrada.</p>;

    return (
        <div>
            <h3>Atividades Econômicas (CNAE)</h3>
            {atividades.map((atividade, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                    <p><strong>Código:</strong> {atividade.codigo}</p>
                    <p><strong>Descrição:</strong> {atividade.descricao}</p>
                    <p><strong>Principal/Secundária:</strong> {atividade.tipo}</p>
                </div>
            ))}
        </div>
    );
};

export default AtividadesTab;
