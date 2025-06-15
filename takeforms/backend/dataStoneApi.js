// backend/dataStoneApi.js
const axios = require('axios');

const DATASTONE_API_BASE_URL = process.env.DATASTONE_API_BASE_URL;
const DATASTONE_API_KEY = process.env.DATASTONE_API_KEY;

async function getAuthHeaders() {
    return {
        'Authorization': DATASTONE_API_KEY
    };
}

// --- Funções para Pessoa Física ---

async function buscarCpf(cpf) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${DATASTONE_API_BASE_URL}/persons`, {
            headers: headers,
            params: {
                cpf: cpf,
                fields: 'all' // Mantemos para tentar obter o máximo
            }
        });
        // --- IMPORTANTÍSSIMO: A Data Stone pode não retornar todos esses campos por padrão ou em todos os planos.
        // --- Você precisa verificar a resposta REAL da Data Stone (via aba Network do navegador)
        // --- e ajustar os nomes dos campos no ResultsDisplay se forem diferentes.
        // --- Abaixo, um exemplo de como poderia ser a resposta ideal (mockada aqui para teste):
        return response.data || {
            cpf: cpf,
            name: "FULANO DA SILVA SAURO",
            birthDate: "01/01/1980",
            gender: "Masculino",
            mothersName: "MÃE DO SAURO",
            address: {
                logradouro: "Rua Exemplo de Pessoa",
                numero: "123",
                complemento: "Apto 101",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "01000-000"
            },
            phones: [
                { number: "(11) 98765-4321", isWhatsapp: true, type: "Celular" },
                { number: "(11) 3210-9876", isWhatsapp: false, type: "Fixo" }
            ],
            emails: ["fulano.silva@example.com"],
            status: "Ativo",
            rendaEstimada: "R$ 5.000,00 - R$ 10.000,00"
        };
    } catch (error) {
        console.error('Erro na chamada à Data Stone (CPF):', error.message);
        throw new Error('Falha ao buscar dados por CPF na Data Stone. Verifique credenciais/URL/plano.');
    }
}

async function buscarNome(nome) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${DATASTONE_API_BASE_URL}/persons/search/`, {
            headers: headers,
            params: {
                q: nome,
                fields: 'all'
            }
        });
        return response.data || [{
            cpf: "123.456.789-00",
            name: `${nome} DA SILVA`,
            birthDate: "05/05/1990",
            address: {
                logradouro: "Avenida da Busca",
                numero: "456",
                bairro: "Jardim Pesquisa",
                cidade: "Rio de Janeiro",
                estado: "RJ",
                cep: "20000-000"
            },
            phones: [
                { number: "(21) 91234-5678", isWhatsapp: true, type: "Celular" }
            ]
        },
        {
            cpf: "987.654.321-00",
            name: `${nome} DE SOUZA`,
            birthDate: "10/10/1985",
            address: {
                logradouro: "Rua do Encontro",
                numero: "789",
                bairro: "Bairro do Sol",
                cidade: "Belo Horizonte",
                estado: "MG",
                cep: "30000-000"
            },
            phones: [
                { number: "(31) 99876-5432", isWhatsapp: false, type: "Celular" }
            ]
        }
        ];
    } catch (error) {
        console.error('Erro na chamada à Data Stone (Nome):', error.message);
        throw new Error('Falha ao buscar dados por Nome na Data Stone. Verifique credenciais/URL.');
    }
}

async function buscarTelefone(telefone) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${DATASTONE_API_BASE_URL}/persons/search/`, {
            headers: headers,
            params: {
                q: telefone,
                fields: 'all'
            }
        });
        return response.data || [{
            cpf: "111.222.333-44",
            name: "TELEFONE DE TAL",
            address: {
                logradouro: "Alameda dos Telefones",
                numero: "10",
                bairro: "Vila Digital",
                cidade: "Curitiba",
                estado: "PR",
                cep: "80000-000"
            },
            phones: [
                { number: telefone, isWhatsapp: true, type: "Celular" }
            ]
        }];
    } catch (error) {
        console.error('Erro na chamada à Data Stone (Telefone):', error.message);
        throw new Error('Falha ao buscar dados por Telefone na Data Stone. Verifique credenciais/URL.');
    }
}

// --- Funções PLACEHOLDER para Empresas (AJUSTAR COM A DOCUMENTAÇÃO REAL DA DATA STONE) ---

async function buscarCnpj(cnpj) {
    console.warn(`[PLACEHOLDER] Buscando CNPJ ${cnpj}. Necessário integrar com a API REAL da Data Stone para empresas.`);
    // Retorna dados dummy para simular um resultado
    return {
        cnpj: cnpj,
        razaoSocial: `EMPRESA EXEMPLO LTDA CNPJ ${cnpj}`,
        nomeFantasia: `EXEMPLO NEGÓCIOS ${cnpj.substring(0, 4)}`,
        status: 'Ativa',
        atividadePrincipal: 'SERVIÇOS DE CONSULTORIA EM TI',
        dataAbertura: '10/03/2005',
        capitalSocial: 'R$ 500.000,00',
        naturezaJuridica: 'Sociedade Empresária Limitada',
        endereco: {
            logradouro: 'Avenida Paulista',
            numero: '1578',
            complemento: 'Andar 10',
            bairro: 'Bela Vista',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01310-200'
        },
        phones: [
            { number: '(11) 3333-4444', isWhatsapp: false, type: "Fixo Comercial" },
            { number: '(11) 97777-8888', isWhatsapp: true, type: "Celular Corporativo" }
        ],
        emails: ['contato@empresaexemplo.com.br', 'financeiro@empresaexemplo.com.br'],
        socios: [
            { nome: 'João Empresa', cpf: '11122233344', qualificacao: 'Sócio-Administrador' },
            { nome: 'Maria Sócio', cpf: '55566677788', qualificacao: 'Sócio' }
        ]
    };
}

async function buscarRazaoSocial(razaoSocial) {
    console.warn(`[PLACEHOLDER] Buscando Razão Social ${razaoSocial}. Necessário integrar com a API REAL da Data Stone para empresas.`);
    return [{
        cnpj: '99.887.766/0001-01',
        razaoSocial: `RAZÃO SOCIAL ${razaoSocial.toUpperCase()} PRODUTOS`,
        nomeFantasia: `FANTASIA ${razaoSocial.substring(0, 5).toUpperCase()}`,
        status: 'Ativa',
        endereco: {
            logradouro: "Rua dos Comércios",
            numero: "500",
            bairro: "Centro",
            cidade: "Campinas",
            estado: "SP",
            cep: "13000-000"
        },
        phones: [
            { number: "(19) 3030-1234", isWhatsapp: false, type: "Fixo" }
        ]
    }, {
        cnpj: '11.223.344/0001-01',
        razaoSocial: `SERVIÇOS ${razaoSocial.toUpperCase()} EIRELI`,
        nomeFantasia: `SERVIÇOS ${razaoSocial.substring(0, 5).toUpperCase()}`,
        status: 'Inativa',
        endereco: {
            logradouro: "Avenida Principal",
            numero: "100",
            bairro: "Bairro Novo",
            cidade: "Porto Alegre",
            estado: "RS",
            cep: "90000-000"
        },
        phones: [
            { number: "(51) 99999-1111", isWhatsapp: true, type: "Celular" }
        ]
    }];
}

async function buscarTelefoneEmpresa(telefone) {
    console.warn(`[PLACEHOLDER] Buscando Telefone de Empresa ${telefone}. Necessário integrar com a API REAL da Data Stone para empresas.`);
    return [{
        cnpj: '12.345.678/0001-99',
        razaoSocial: `EMPRESA DO TELEFONE ${telefone}`,
        nomeFantasia: `TEL BUSINESS`,
        endereco: {
            logradouro: "Rua do Contato",
            numero: "77",
            bairro: "Vila Conectada",
            cidade: "Salvador",
            estado: "BA",
            cep: "40000-000"
        },
        phones: [
            { number: telefone, isWhatsapp: true, type: "Fixo" }
        ]
    }];
}

module.exports = {
    buscarCpf,
    buscarNome,
    buscarTelefone,
    buscarCnpj,
    buscarRazaoSocial,
    buscarTelefoneEmpresa
};