// frontend/src/App.jsx
import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation'; // Navegação por abas de busca (CPF/Nome/Telefone)
import SearchByCpfForm from './components/SearchByCpfForm';
import SearchByNameForm from './components/SearchByNameForm';
import SearchByPhoneForm from './components/SearchByPhoneForm';

// Novos componentes para empresas
import SearchByCnpjForm from './components/SearchByCnpjForm';
import SearchByRazaoSocialForm from './components/SearchByRazaoSocialForm';
import SearchByPhoneCompanyForm from './components/SearchByPhoneCompanyForm';

import ResultsDisplay from './components/ResultsDisplay';

function App() {
    const [activeCategory, setActiveCategory] = useState('persons'); // 'persons' ou 'companies'
    const [activePersonTab, setActivePersonTab] = useState('cpf'); // 'cpf', 'nome', 'telefone'
    const [activeCompanyTab, setActiveCompanyTab] = useState('cnpj'); // 'cnpj', 'razaoSocial', 'telefoneEmpresa'

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

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
                setResults(null); // Limpa resultados anteriores se houver erro
            }
        } catch (err) {
            console.error('Erro na comunicação com o backend:', err);
            setError('Erro ao conectar com o servidor ou problema na resposta. Tente novamente mais tarde.');
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    const renderCurrentSearchSection = () => {
        if (activeCategory === 'persons') {
            return (
                <>
                    <TabNavigation
                        activeTab={activePersonTab}
                        onTabChange={setActivePersonTab}
                        tabs={[
                            { id: 'cpf', label: 'Buscar por CPF' },
                            { id: 'nome', label: 'Buscar por Nome' },
                            { id: 'telefone', label: 'Buscar por Telefone' }
                        ]}
                    />
                    {activePersonTab === 'cpf' && <SearchByCpfForm onSearch={handleSearch} loading={loading} />}
                    {activePersonTab === 'nome' && <SearchByNameForm onSearch={handleSearch} loading={loading} />}
                    {activePersonTab === 'telefone' && <SearchByPhoneForm onSearch={handleSearch} loading={loading} />}
                </>
            );
        } else if (activeCategory === 'companies') {
            return (
                <>
                    <TabNavigation
                        activeTab={activeCompanyTab}
                        onTabChange={setActiveCompanyTab}
                        tabs={[
                            { id: 'cnpj', label: 'Buscar por CNPJ' },
                            { id: 'razaoSocial', label: 'Buscar por Razão Social' },
                            { id: 'telefoneEmpresa', label: 'Buscar por Telefone' }
                        ]}
                    />
                    {activeCompanyTab === 'cnpj' && <SearchByCnpjForm onSearch={handleSearch} loading={loading} />}
                    {activeCompanyTab === 'razaoSocial' && <SearchByRazaoSocialForm onSearch={handleSearch} loading={loading} />}
                    {activeCompanyTab === 'telefoneEmpresa' && <SearchByPhoneCompanyForm onSearch={handleSearch} loading={loading} />}
                </>
            );
        }
        return null;
    };

    return (
        <div className="container">
            <h1>TakeForms - Consulta de Dados</h1>

            <div className="category-navigation">
                <button
                    className={`category-button ${activeCategory === 'persons' ? 'active' : ''}`}
                    onClick={() => { setActiveCategory('persons'); setResults(null); setError(null); }}
                >
                    Consumidores
                </button>
                <button
                    className={`category-button ${activeCategory === 'companies' ? 'active' : ''}`}
                    onClick={() => { setActiveCategory('companies'); setResults(null); setError(null); }}
                >
                    Empresas
                </button>
            </div>

            {renderCurrentSearchSection()}

            {loading && <div className="message-box loading-message">Carregando...</div>}
            {error && <div className="message-box error-message">{error}</div>}

            <ResultsDisplay data={results} type={activeCategory} />
        </div>
    );
}

export default App;