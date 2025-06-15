// frontend/src/components/SearchByCpfForm.jsx
import React, { useState } from 'react';

function SearchByCpfForm({ onSearch, loading }) {
    const [cpf, setCpf] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('cpf', cpf); // Passa o tipo de busca
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="cpfInput"
                placeholder="Digite o CPF (somente números)"
                value={cpf}
                onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
                maxLength="11"
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar CPF'}
            </button>
        </form>
    );
}

export default SearchByCpfForm;