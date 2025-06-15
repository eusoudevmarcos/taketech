// frontend/src/components/SearchByCnpjForm.jsx
import React, { useState } from 'react';

function SearchByCnpjForm({ onSearch, loading }) {
    const [cnpj, setCnpj] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('cnpj', cnpj.replace(/\D/g, '')); // Limpa o CNPJ antes de enviar
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="cnpjInput"
                placeholder="Digite o CNPJ (somente números)"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value.replace(/\D/g, '').substring(0, 14))} // Limita a 14 dígitos
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar CNPJ'}
            </button>
        </form>
    );
}

export default SearchByCnpjForm;