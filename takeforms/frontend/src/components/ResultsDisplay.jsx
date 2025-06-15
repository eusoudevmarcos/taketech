// frontend/src/components/ResultsDisplay.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Ícone do WhatsApp
import { FaPhone, FaMobileAlt, FaBuilding, FaUser } from 'react-icons/fa'; // Mais ícones para contexto

// Mapeia o 'type' da busca para um título amigável
const getTypeName = (searchType) => {
    switch (searchType) {
        case 'cpf': return 'CPF (Pessoa Física)';
        case 'nome': return 'Nome (Pessoa Física)';
        case 'telefone': return 'Telefone (Pessoa Física)';
        case 'cnpj': return 'CNPJ (Pessoa Jurídica)';
        case 'razaoSocial': return 'Razão Social (Pessoa Jurídica)';
        case 'telefoneEmpresa': return 'Telefone (Pessoa Jurídica)';
        default: return 'Busca';
    }
};

// Componente auxiliar para renderizar um par de campo/valor
// Ajustado para lidar com os nomes de campo dos PDFs
const FieldRow = ({ label, value, type, isMainField = false }) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        return (
            <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
                <strong>{label}:</strong> <span className="value-na">Não disponível</span>
            </div>
        );
    }
    
    // Tratamento para arrays de telefones (vindos de PF ou PJ)
    // A API real da Data Stone precisa indicar se é WhatsApp ou você terá que inferir.
    // Baseado nos PDFs, a Data Stone retorna apenas a string do número para telefones.
    // Mantenho a lógica de `isWhatsapp` mas ela dependerá do JSON real da API.
    if (type === 'phone' && Array.isArray(value)) {
        return (
            <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
                <strong>{label}:</strong>
                <ul className="phone-list">
                    {value.map((phoneItem, index) => {
                        // Se for um objeto (como no dummy data que eu criei, mas não no PDF real)
                        if (typeof phoneItem === 'object' && phoneItem !== null && phoneItem.number) {
                            return (
                                <li key={index}>
                                    <FaMobileAlt className="phone-icon" /> {phoneItem.number}
                                    {phoneItem.isWhatsapp && <FaWhatsapp className="whatsapp-icon" title="Possui WhatsApp" />}
                                    {phoneItem.type && <span className="phone-type"> ({phoneItem.type})</span>}
                                </li>
                            );
                        }
                        // Se for apenas uma string (como no PDF)
                        return (
                            <li key={index}>
                                <FaMobileAlt className="phone-icon" /> {phoneItem}
                                {/* Não temos como saber se é WhatsApp apenas pela string do PDF,
                                    a menos que a API real forneça essa informação em outro campo. */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    // Tratamento para arrays de E-mails
    if (type === 'email' && Array.isArray(value)) {
        return (
            <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
                <strong>{label}:</strong>
                <ul className="email-list">
                    {value.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
            </div>
        );
    }

    // Tratamento para arrays de endereços (múltiplos endereços para PF)
    if (type === 'addressList' && Array.isArray(value)) {
        return (
            <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
                <strong>{label}:</strong>
                <ul className="address-list">
                    {value.map((addr, index) => (
                        <li key={index} className="address-item">
                            {/* Nomes dos campos do PDF para endereço */}
                            {addr.Logradouro && <span>{addr.Logradouro}, </span>}
                            {addr.Complemento && <span>{addr.Complemento}, </span>}
                            {addr.Bairro && <span>{addr.Bairro}, </span>}
                            {addr.Cidade && <span>{addr.Cidade} / </span>}
                            {addr.Estado && <span>{addr.Estado} - </span>}
                            {addr.CEP && <span>{addr.CEP}</span>}
                            {/* Adicione outras informações se a API da Data Stone as fornecer */}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Tratamento para um único objeto de endereço (para PJ)
    if (type === 'address' && typeof value === 'object' && value !== null) {
        // Nomes dos campos do PDF para PJ (pode ser diferente de PF em nome de campos ou ter número/complemento separado)
        const enderecoCompleto = [
            value.Endereço, // Campo principal que contém logradouro e número (CNPJ PDF)
            value.Complemento,
            value.Bairro,
            value.Cidade,
            value.Estado,
            value.CEP
        ].filter(Boolean).join(', '); // Filtra valores nulos/vazios e junta

        if (!enderecoCompleto) {
            return (
                 <div className="field-row">
                    <strong>{label}:</strong> <span className="value-na">Não disponível</span>
                </div>
            );
        }
        return (
            <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
                <strong>{label}:</strong> <span>{enderecoCompleto}</span>
            </div>
        );
    }

    // Para outros tipos de valores (string, number, boolean)
    return (
        <div className={`field-row ${isMainField ? 'main-field' : ''}`}>
            <strong>{label}:</strong> <span>{value.toString()}</span>
        </div>
    );
};


function ResultsDisplay({ data, type }) {
    const displayTitle = getTypeName(type);

    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
        return (
            <div className="no-results-message">
                Nenhum resultado encontrado para a busca por {displayTitle}.
                <p>Verifique o valor pesquisado ou seu plano/permissões na Data Stone.</p>
            </div>
        );
    }

    // Função para renderizar uma ficha de Pessoa (Consumidor)
    const renderPersonFicha = (person) => {
        // Assume que o PDF da Data Stone pode retornar estes campos
        const {
            Documento, // CPF
            Nome, // Nome Completo
            Sexo,
            'Data de nascimento': DataNascimento,
            Idade,
            Signo,
            'Faixa de renda presumida': RendaPresumida,
            'Situação Cadastral': SituacaoCadastral,
            PEP,
            'Telefones celular': TelefonesCelular,
            'Telefones fixo': TelefonesFixo,
            'E-mails': Emails,
            Endereço, // Array de endereços para PF
            'NOME DA MÃE': NomeDaMae,
            'Participação em quadro societário': ParticipacaoSocietaria // Exemplo de associação a CNPJ
            // ... adicione outros campos conforme o JSON REAL da sua API Data Stone
        } = person;

        // Combina telefones celular e fixo
        const allPhones = [];
        if (TelefonesCelular && Array.isArray(TelefonesCelular)) {
            allPhones.push(...TelefonesCelular);
        }
        if (TelefonesFixo && Array.isArray(TelefonesFixo)) {
            allPhones.push(...TelefonesFixo);
        }
        
        return (
            <div className="ficha-item" key={Documento || Nome || Math.random()}>
                <h4><FaUser className="ficha-icon" /> {Nome || 'Nome Não Disponível'}</h4>
                <FieldRow label="CPF" value={Documento} isMainField={true} />
                <FieldRow label="Nome da Mãe" value={NomeDaMae} />
                <FieldRow label="Data de Nascimento" value={DataNascimento} />
                <FieldRow label="Idade" value={Idade} />
                <FieldRow label="Sexo" value={Sexo} />
                <FieldRow label="Signo" value={Signo} />
                <FieldRow label="Faixa de Renda Presumida" value={RendaPresumida} />
                <FieldRow label="Situação Cadastral" value={SituacaoCadastral} />
                <FieldRow label="PEP" value={PEP} />
                <FieldRow label="Telefones" value={allPhones} type="phone" isMainField={true} />
                <FieldRow label="E-mails" value={Emails} type="email" />
                {/* Se 'Endereço' for um array de objetos de endereço */}
                <FieldRow label="Endereços" value={Endereço} type="addressList" isMainField={true} />
                
                {/* Lógica para participação societária (se a API retornar isso) */}
                {ParticipacaoSocietaria && ParticipacaoSocietaria.length > 0 && (
                    <div className="field-section">
                        <h5><FaBuilding className="ficha-icon" /> Participação Societária:</h5>
                        <ul className="socios-list">
                            {ParticipacaoSocietaria.map((socio, index) => (
                                <li key={index}>
                                    <strong>{socio.NOME || socio.Nome}</strong> ({socio['SITUAÇÃO CAD.'] || socio.SituacaoCadastral})
                                    {/* Adicione mais detalhes se a API retornar, como CNPJ associado direto */}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    // Função para renderizar uma ficha de Empresa
    const renderCompanyFicha = (company) => {
        // Assume que o PDF da Data Stone pode retornar estes campos
        const {
            Documento, // CNPJ
            Nome, // Razão Social (nome principal no PDF)
            'Data de abertura': DataAbertura,
            Tamanho,
            'Range de número de funcionários': RangeFuncionarios,
            Situação,
            Tipo, // Tipo de empresa (Matriz)
            'Fundada há': FundadaHa,
            Porte,
            'Simples nacional': SimplesNacional,
            SIMEI, // Objeto ou string para SIMEI
            'Data opção SIMEI': DataOpcaoSIMEI,
            'Código natureza jurídica': CodigoNaturezaJuridica,
            'Descrição natureza jurídica': DescricaoNaturezaJuridica,
            'Faturamento presumido': FaturamentoPresumido,
            'Capital social': CapitalSocial,
            'Código CNAE': CodigoCNAE,
            'Descrição CNAE': DescricaoCNAE,
            'CNAE secundário': CNAESecundario, // Array de objetos {CÓDIGO, DESCRIÇÃO}
            Endereço, // Objeto único de endereço para PJ
            Telefone, // Um único telefone no PDF para PJ
            'E-mails': Emails,
            Sócios // Array de objetos {NOME, PARTICIPAÇÃO, CARGO}
            // ... adicione outros campos conforme o JSON REAL da sua API Data Stone
        } = company;

        // Formata o SIMEI se for um objeto ou string
        let simeiDisplay = SIMEI;
        if (typeof SIMEI === 'object' && SIMEI !== null && SIMEI.status) { // Ex: {status: 'Não', date: '...'}
            simeiDisplay = `${SIMEI.status} (${SIMEI.date || 'Data não disponível'})`;
        } else if (DataOpcaoSIMEI) { // Se o SIMEI for só "Não" mas a data de opção existir
            simeiDisplay = `${SIMEI} (Data opção SIMEI: ${DataOpcaoSIMEI})`;
        }
        
        // Formata o telefone da empresa (o PDF mostra apenas um, mas a API pode dar um array)
        const companyPhones = Array.isArray(Telefone) ? Telefone : (Telefone ? [Telefone] : []);

        return (
            <div className="ficha-item" key={Documento || Nome || Math.random()}>
                <h4><FaBuilding className="ficha-icon" /> {Nome || 'Razão Social Não Disponível'}</h4>
                <FieldRow label="CNPJ" value={Documento} isMainField={true} />
                <FieldRow label="Razão Social" value={Nome} isMainField={true} />
                <FieldRow label="Nome Fantasia" value={company['Nome Fantasia'] || 'Não disponível'} /> {/* No PDF não tem, mas é comum */}
                <FieldRow label="Situação" value={Situação} />
                <FieldRow label="Data de Abertura" value={DataAbertura} />
                <FieldRow label="Tipo" value={Tipo} />
                <FieldRow label="Porte" value={Porte} />
                <FieldRow label="Fundada há" value={FundadaHa} />
                <FieldRow label="Simples Nacional" value={SimplesNacional} />
                <FieldRow label="SIMEI" value={simeiDisplay} />
                <FieldRow label="Capital Social" value={CapitalSocial} />
                <FieldRow label="Faturamento Presumido" value={FaturamentoPresumido} />
                <FieldRow label="Atividade Principal (CNAE)" value={`${CodigoCNAE || ''} - ${DescricaoCNAE || ''}`.trim()} />
                <FieldRow label="Endereço Completo" value={Endereço} type="address" isMainField={true} /> {/* Assumindo um único objeto Endereço para PJ */}
                <FieldRow label="Telefone" value={companyPhones} type="phone" isMainField={true} />
                <FieldRow label="E-mails" value={Emails} type="email" />

                {CNAESecundario && CNAESecundario.length > 0 && (
                    <div className="field-section">
                        <h5>CNAEs Secundários:</h5>
                        <ul className="cnae-list">
                            {CNAESecundario.map((cnae, index) => (
                                <li key={index}>
                                    <strong>{cnae.CÓDIGO}</strong> - {cnae.DESCRIÇÃO}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {Sócios && Sócios.length > 0 && (
                    <div className="field-section">
                        <h5>Sócios:</h5>
                        <ul className="socios-list">
                            {Sócios.map((socio, index) => (
                                <li key={index}>
                                    <strong>{socio.NOME}</strong> - {socio.PARTICIPAÇÃO} - {socio.CARGO}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="results-box">
            <h3>Ficha de {displayTitle}:</h3>
            {/* O "data" do backend já está formatado para ser um array ou um objeto único */}
            {Array.isArray(data) ? (
                // Se for um array de resultados (busca por nome/telefone), renderiza cada um
                data.map(item => (
                    (type === 'cpf' || type === 'nome' || type === 'telefone') ? renderPersonFicha(item) : renderCompanyFicha(item)
                ))
            ) : (
                // Se for um único resultado (busca por CPF/CNPJ), renderiza diretamente
                (type === 'cpf' || type === 'nome' || type === 'telefone') ? renderPersonFicha(data) : renderCompanyFicha(data)
            )}
        </div>
    );
}

export default ResultsDisplay;