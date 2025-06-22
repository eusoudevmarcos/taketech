// backend/mockData/mockResults.js

const mockResults = {
    "12345678000195": {
        tipo: "empresa",
        dadosCadastrais: {
            nome: "Empresa Exemplo LTDA",
            cnpj: "12.345.678/0001-95",
            abertura: "01/01/2010",
            naturezaJuridica: "Sociedade Empresária Limitada",
            situacao: "Ativa"
        },
        endereco: {
            logradouro: "Rua Exemplo",
            numero: "123",
            complemento: "Sala 10",
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01000-000"
        },
        socios: [
            { nome: "João Silva", cpf: "123.456.789-00", qualificacao: "Administrador" },
            { nome: "Maria Souza", cpf: "987.654.321-00", qualificacao: "Sócio" }
        ],
        atividades: [
            { codigo: "6201-5/01", descricao: "Desenvolvimento de programas de computador", tipo: "Principal" },
            { codigo: "6202-3/00", descricao: "Consultoria em tecnologia da informação", tipo: "Secundária" }
        ],
        contatos: [
            { tipo: "Telefone", valor: "(11) 1234-5678" },
            { tipo: "Email", valor: "contato@exemplo.com.br" }
        ]
    },
    "11122233344": {
        tipo: "consumidor",
        dadosCadastrais: {
            nome: "Fulano de Tal",
            cpf: "111.222.333-44",
            nascimento: "15/05/1990",
            sexo: "Masculino",
            mae: "Maria de Tal",
            situacao: "Regular"
        },
        endereco: {
            logradouro: "Av. Principal",
            numero: "500",
            complemento: "",
            bairro: "Bairro Novo",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            cep: "20000-000"
        },
        contatos: [
            { tipo: "Telefone", valor: "(21) 98765-4321" },
            { tipo: "Email", valor: "fulano@gmail.com" }
        ]
    }
};

module.exports = mockResults;
