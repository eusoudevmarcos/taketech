// frontend/src/components/SearchByNameForm.jsx
import React, { useState } from 'react';

function SearchByNameForm({ onSearch, loading }) {
    const [nome, setNome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('nome', nome); // Passa o tipo de busca
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="nomeInput"
                placeholder="Digite o Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar Nome'}
            </button>
        </form>
    );
}

export default SearchByNameForm;