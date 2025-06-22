// src/components/TabNavigation.jsx
import React, { useState } from 'react';
import DadosCadastraisTab from './tabs/DadosCadastraisTab';
import EnderecoTab from './tabs/EnderecoTab';
import SociedadeTab from './tabs/SociedadeTab';
import AtividadesTab from './tabs/AtividadesTab';
import ContatosTab from './tabs/ContatosTab';

const TabNavigation = ({ personDetails }) => {
    const tabs = ['Dados Cadastrais', 'Endereço', 'Sociedade', 'Atividades', 'Contatos'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Dados Cadastrais':
                return <DadosCadastraisTab data={personDetails} />;
            case 'Endereço':
                return <EnderecoTab data={personDetails} />;
            case 'Sociedade':
                return <SociedadeTab data={personDetails} />;
            case 'Atividades':
                return <AtividadesTab data={personDetails} />;
            case 'Contatos':
                return <ContatosTab data={personDetails} />;
            default:
                return null;
        }
    };

    return (
        <div className="tab-navigation">
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={activeTab === tab ? 'active' : ''}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content-container">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default TabNavigation;
