const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);

const dbName = process.env.MONGO_DB_NAME || 'super_herois_db_nosql';
let dbInstance = null;

async function connectToMongo() {
    try {
        await client.connect();
        console.log('✅ MongoDB conectado com sucesso!');
        dbInstance = client.db(dbName);
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB:', err);
        process.exit(1); 
    }
}

function getDb() {
    if (!dbInstance) {
        console.warn("Conexão com MongoDB ainda não estabelecida.");
    }
    return dbInstance;
}

module.exports = { connectToMongo, getDb };