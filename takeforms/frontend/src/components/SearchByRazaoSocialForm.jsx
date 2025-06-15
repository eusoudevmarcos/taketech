// frontend/src/components/SearchByRazaoSocialForm.jsx
import React, { useState } from 'react';

function SearchByRazaoSocialForm({ onSearch, loading }) {
    const [razaoSocial, setRazaoSocial] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('razaoSocial', razaoSocial);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="razaoSocialInput"
                placeholder="Digite a Razão Social"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar Razão Social'}
            </button>
        </form>
    );
}

export default SearchByRazaoSocialForm;