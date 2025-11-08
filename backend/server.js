const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = 3000;

const apiRoutes = require('./routes/api');
const { connectToMongo } = require('./config/mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
    connectToMongo();
});