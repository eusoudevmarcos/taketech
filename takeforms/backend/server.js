// backend/server.js
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors'); // Para permitir requisições do frontend
const dataStoneApi = require('./dataStoneApi'); // Nosso módulo para interagir com a Data Stone

const app = express();
const PORT = process.env.PORT || 3001; // Porta do servidor, padrão 3001

app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Função auxiliar para formatar os dados de forma consistente antes de enviar ao frontend
// Agora, essa função apenas garante que os dados estão no formato esperado (array ou objeto único)
// A formatação detalhada dos campos será feita no frontend.
function formatDataForFrontend(type, rawData, query) {
    let formatted = {
        success: true,
        origem: "TakeForms",
        tipoBusca: type,
        query: query,
        data: null // Inicializa como nulo
    };

    // Se não houver dados, ou se for um array/objeto vazio
    if (!rawData || (Array.isArray(rawData) && rawData.length === 0) || (typeof rawData === 'object' && Object.keys(rawData).length === 0)) {
        formatted.success = false;
        formatted.message = `Nenhum resultado encontrado para a busca por ${type}.`;
        formatted.data = null;
        return formatted;
    }

    // Para CPF e CNPJ, esperamos um único objeto, mesmo que a API retorne um array com um item
    if (type === 'cpf' || type === 'cnpj') {
        formatted.data = Array.isArray(rawData) ? rawData[0] : rawData; // Pega o primeiro item se for array, senão o próprio objeto
    } else {
        // Para Nome e Telefone (PF e PJ), esperamos um array (pode haver múltiplos resultados)
        formatted.data = Array.isArray(rawData) ? rawData : [rawData]; // Garante que seja um array
    }

    // Se após a formatação, o dado principal ainda for nulo (ex: array vazio que foi convertido para null)
    if (!formatted.data || (Array.isArray(formatted.data) && formatted.data.length === 0) || (typeof formatted.data === 'object' && Object.keys(formatted.data).length === 0)) {
        formatted.success = false;
        formatted.message = `Nenhum resultado detalhado encontrado para a busca por ${type}.`;
        formatted.data = null;
    }

    return formatted;
}

// --- Rotas de Busca para Pessoas Físicas (Consumidores) ---
app.get('/api/persons/cpf', async (req, res) => {
    const cpf = req.query.q;
    if (!cpf) {
        return res.status(400).json({ success: false, message: 'CPF é obrigatório.' });
    }
    try {
        const data = await dataStoneApi.buscarCpf(cpf);
        res.json(formatDataForFrontend('cpf', data, cpf));
    } catch (error) {
        console.error('Erro ao buscar CPF:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/persons/name', async (req, res) => {
    const name = req.query.q;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Nome é obrigatório.' });
    }
    try {
        const data = await dataStoneApi.buscarNome(name);
        res.json(formatDataForFrontend('nome', data, name));
    } catch (error) {
        console.error('Erro ao buscar Nome:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/persons/phone', async (req, res) => {
    const phone = req.query.q;
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Telefone é obrigatório.' });
    }
    try {
        const data = await dataStoneApi.buscarTelefone(phone);
        res.json(formatDataForFrontend('telefone', data, phone));
    } catch (error) {
        console.error('Erro ao buscar Telefone PF:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});


// --- Rotas de Busca para Empresas ---
app.get('/api/companies/cnpj', async (req, res) => {
    const cnpj = req.query.q;
    if (!cnpj) {
        return res.status(400).json({ success: false, message: 'CNPJ é obrigatório.' });
    }
    try {
        const data = await dataStoneApi.buscarCnpj(cnpj);
        res.json(formatDataForFrontend('cnpj', data, cnpj));
    } catch (error) {
        console.error('Erro ao buscar CNPJ:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/companies/razaoSocial', async (req, res) => {
    const razaoSocial = req.query.q;
    if (!razaoSocial) {
        return res.status(400).json({ success: false, message: 'Razão Social é obrigatória.' });
    }
    try {
        const data = await dataStoneApi.buscarRazaoSocial(razaoSocial);
        res.json(formatDataForFrontend('razaoSocial', data, razaoSocial));
    } catch (error) {
        console.error('Erro ao buscar Razão Social:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/companies/phone', async (req, res) => {
    const phone = req.query.q;
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Telefone é obrigatório.' });
    }
    try {
        const data = await dataStoneApi.buscarTelefoneEmpresa(phone);
        res.json(formatDataForFrontend('telefoneEmpresa', data, phone));
    } catch (error) {
        console.error('Erro ao buscar Telefone PJ:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});


// Rota principal (apenas para testar se o servidor está no ar)
app.get('/', (req, res) => {
    res.send('TakeForms Backend está rodando!');
});

app.listen(PORT, () => {
    console.log(`TakeForms Backend rodando em http://localhost:${PORT}`);
});