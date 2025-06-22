const axios = require('axios');
require('dotenv').config();

const apiBaseUrl = process.env.DATASTONE_API_BASE_URL;
const apiKey = process.env.DATASTONE_API_KEY;

const makeDataStoneRequest = async (endpoint, payload) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}${endpoint}`,
      payload,
      {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro na requisição à DataStone [${endpoint}]:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  consultaCPF: (cpf) => makeDataStoneRequest('/v1/consulta/cpf', { cpf }),
  consultaNome: (nome) => makeDataStoneRequest('/v1/consulta/nome', { nome }),
  consultaCNPJ: (cnpj) => makeDataStoneRequest('/v1/consulta/cnpj', { cnpj }),
  consultaRazaoSocial: (nome) => makeDataStoneRequest('/v1/consulta/razao-social', { nome })
};
