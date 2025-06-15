// frontend/src/components/SearchByPhoneForm.jsx
import React, { useState } from 'react';

function SearchByPhoneForm({ onSearch, loading }) {
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('telefone', phone.replace(/\D/g, '')); // Limpa o telefone antes de enviar
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="phoneInput"
                placeholder="Digite o Telefone/WhatsApp (DDD + Número, ex: 11987654321)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar Telefone'}
            </button>
        </form>
    );
}

export default SearchByPhoneForm;