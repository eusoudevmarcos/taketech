// frontend/src/components/SearchForm.jsx
import React, { useState } from 'react';

function SearchForm({ onSearch, loading }) {
    const [cpf, setCpf] = useState(''); // Estado para guardar o que o usuário digita no CPF

    // Função que é chamada quando o formulário é enviado (botão Consultar clicado)
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue
        onSearch(cpf); // Chama a função que veio do componente pai (App.jsx)
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <input
                type="text"
                id="cpfInput"
                placeholder="Digite o CPF (somente números)"
                value={cpf} // O valor da caixa de texto é o que está no estado `cpf`
                // Quando o usuário digita, atualiza o estado `cpf` e remove não-números
                onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
                maxLength="11" // Limita a 11 dígitos
                disabled={loading} // Desabilita enquanto estiver carregando
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar'} {/* Muda o texto do botão */}
            </button>
        </form>
    );
}

export default SearchForm; // Exporta o componente para ser usado em outros lugares