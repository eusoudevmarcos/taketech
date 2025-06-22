const mockResults = require('../mockData/mockResults');

exports.searchByDocument = (req, res) => {
    const { document } = req.params;

    const result = mockResults[document];

    if (!result) {
        return res.status(404).json({ message: 'Documento não encontrado.' });
    }

    res.json(result);
};