// frontend/src/components/SearchForm.jsx
import React, { useState } from 'react';

function SearchForm({ type, placeholder, mask, onSearch, loading }) {
  const [input, setInput] = useState('');

  // Função para aplicar máscara simples (exemplo CPF, CNPJ)
  const applyMask = (value) => {
    if (!mask) return value;
    // Exemplo rápido para CPF/CNPJ, pode ser extendido conforme necessidade
    if (mask === 'cpf') {
      value = value.replace(/\D/g, '').slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    }
    if (mask === 'cnpj') {
      value = value.replace(/\D/g, '').slice(0, 14);
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      return value;
    }
    // Para telefone ou outros, pode implementar aqui
    return value;
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const maskedValue = applyMask(rawValue);
    setInput(maskedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(type, input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        disabled={loading}
        autoComplete="off"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}

export default SearchForm;
