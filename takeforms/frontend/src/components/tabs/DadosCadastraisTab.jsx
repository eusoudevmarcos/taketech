// src/components/tabs/DadosCadastraisTab.jsx
import React from 'react';

const DadosCadastraisTab = ({ data }) => {
    if (!data) return null;

    const {
        cnpj,
        razaoSocial,
        nomeFantasia,
        naturezaJuridica,
        dataAbertura,
        situacaoCadastral,
        capitalSocial
    } = data;

    return (
        <div className="tab-content">
            <h3>Dados Cadastrais</h3>
            <p><strong>CNPJ:</strong> {cnpj || 'Não informado'}</p>
            <p><strong>Razão Social:</strong> {razaoSocial || 'Não informado'}</p>
            <p><strong>Nome Fantasia:</strong> {nomeFantasia || 'Não informado'}</p>
            <p><strong>Natureza Jurídica:</strong> {naturezaJuridica || 'Não informado'}</p>
            <p><strong>Data de Abertura:</strong> {dataAbertura || 'Não informado'}</p>
            <p><strong>Situação Cadastral:</strong> {situacaoCadastral || 'Não informado'}</p>
            <p><strong>Capital Social:</strong> {capitalSocial || 'Não informado'}</p>
        </div>
    );
};

export default DadosCadastraisTab;
