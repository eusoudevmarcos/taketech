const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de pessoa física
const personRoutes = require('./routes/personRoutes');
app.use('/api/persons', personRoutes);

// Outras rotas futuras: companies, etc.

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));