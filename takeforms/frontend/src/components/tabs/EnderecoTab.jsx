// src/components/tab/EnderecoTab.jsx
import React from 'react';

const EnderecoTab = ({ endereco }) => {
    if (!endereco) return <p>Nenhuma informação de endereço disponível.</p>;

    return (
        <div>
            <h3>Endereço</h3>
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Número:</strong> {endereco.numero}</p>
            <p><strong>Complemento:</strong> {endereco.complemento}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.cidade}</p>
            <p><strong>Estado:</strong> {endereco.estado}</p>
            <p><strong>CEP:</strong> {endereco.cep}</p>
        </div>
    );
};

export default EnderecoTab;
