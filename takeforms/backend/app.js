const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', personRoutes);

module.exports = app;
