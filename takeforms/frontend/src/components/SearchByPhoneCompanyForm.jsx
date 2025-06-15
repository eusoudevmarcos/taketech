// frontend/src/components/SearchByPhoneCompanyForm.jsx
import React, { useState } from 'react';

function SearchByPhoneCompanyForm({ onSearch, loading }) {
    const [phoneCompany, setPhoneCompany] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch('telefoneEmpresa', phoneCompany.replace(/\D/g, '')); // Limpa o telefone antes de enviar
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                id="phoneCompanyInput"
                placeholder="Telefone da Empresa (DDD + Número)"
                value={phoneCompany}
                onChange={(e) => setPhoneCompany(e.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar Telefone'}
            </button>
        </form>
    );
}

export default SearchByPhoneCompanyForm;