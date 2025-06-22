// frontend/src/App.jsx
import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import SearchForm from './components/SearchForm';  // Componente genérico para busca
import ResultsDisplay from './components/ResultsDisplay';
import PersonDetailsModal from './components/PersonDetailsModal';

function App() {
    const [activeCategory, setActiveCategory] = useState('persons'); // 'persons' ou 'companies'
    const [activeTab, setActiveTab] = useState('cpf'); // Tab atual, ex: 'cpf', 'nome', 'cnpj', 'razaoSocial' etc.

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // Define as tabs de busca para cada categoria
    const tabsByCategory = {
        persons: [
            { id: 'cpf', label: 'Buscar por CPF' },
            { id: 'nome', label: 'Buscar por Nome' },
            { id: 'telefone', label: 'Buscar por Telefone' }
        ],
        companies: [
            { id: 'cnpj', label: 'Buscar por CNPJ' },
            { id: 'razaoSocial', label: 'Buscar por Razão Social' },
            { id: 'telefoneEmpresa', label: 'Buscar por Telefone' }
        ]
    };

    // Função para fazer a busca no backend
    const handleSearch = async (type, query) => {
        if (!query || query.trim() === '') {
            setError('Por favor, preencha o campo de busca.');
            setResults(null);
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        let endpoint = '';
        let params = {};
        let apiUrl = 'http://localhost:3001/api/';

        // Validações específicas
        switch (type) {
            case 'cpf':
                if (query.replace(/\D/g, '').length !== 11) {
                    setError('CPF inválido. Deve conter 11 dígitos.');
                    setLoading(false); return;
                }
                endpoint = 'persons/cpf';
                params = { cpf: query.replace(/\D/g, '') };
                break;
            case 'nome':
                if (query.length < 3) {
                    setError('Nome muito curto. Mínimo de 3 caracteres.');
                    setLoading(false); return;
                }
                endpoint = 'persons/nome';
                params = { nome: query };
                break;
            case 'telefone':
                if (query.replace(/\D/g, '').length < 10) {
                    setError('Telefone inválido. Mínimo de 10 dígitos (DDD + Número).');
                    setLoading(false); return;
                }
                endpoint = 'persons/telefone';
                params = { telefone: query.replace(/\D/g, '') };
                break;
            case 'cnpj':
                if (query.replace(/\D/g, '').length !== 14) {
                    setError('CNPJ inválido. Deve conter 14 dígitos.');
                    setLoading(false); return;
                }
                endpoint = 'companies/cnpj';
                params = { cnpj: query.replace(/\D/g, '') };
                break;
            case 'razaoSocial':
                if (query.length < 3) {
                    setError('Razão Social muito curta. Mínimo de 3 caracteres.');
                    setLoading(false); return;
                }
                endpoint = 'companies/razao-social';
                params = { razaoSocial: query };
                break;
            case 'telefoneEmpresa':
                if (query.replace(/\D/g, '').length < 10) {
                    setError('Telefone inválido. Mínimo de 10 dígitos (DDD + Número).');
                    setLoading(false); return;
                }
                endpoint = 'companies/telefone';
                params = { telefone: query.replace(/\D/g, '') };
                break;
            default:
                setError('Tipo de busca inválido.');
                setLoading(false);
                return;
        }

        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${apiUrl}${endpoint}?${queryString}`);
            const data = await response.json();

            if (response.ok && data.success) {
                setResults(data.data);
            } else {
                setError(data.message || 'Erro desconhecido na busca.');
                setResults(null);
            }
        } catch (err) {
            console.error('Erro na comunicação com o backend:', err);
            setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    // Quando muda categoria, resetar abas e dados
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setActiveTab(tabsByCategory[category][0].id);
        setResults(null);
        setError(null);
        setSelectedItem(null);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="container">
            <h1>TakeForms - Consulta de Dados</h1>

            <div className="category-navigation">
                <button
                    className={`category-button ${activeCategory === 'persons' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('persons')}
                >
                    Consumidores
                </button>
                <button
                    className={`category-button ${activeCategory === 'companies' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('companies')}
                >
                    Empresas
                </button>
            </div>

            <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabsByCategory[activeCategory]}
            />

            <SearchForm
                searchType={activeTab}
                onSearch={handleSearch}
                loading={loading}
            />

            {error && <div className="message-box error-message">{error}</div>}
            {loading && <div className="message-box loading-message">Carregando...</div>}

            <ResultsDisplay data={results} type={activeCategory} onSelect={handleSelectItem} />

            {selectedItem && (
                <PersonDetailsModal
                    item={selectedItem}
                    type={activeCategory}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default App;
