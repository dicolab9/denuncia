const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões no Render
  },
});

module.exports = pool;
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Teste de conexão
// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log('Conexão com o banco de dados estabelecida com sucesso!');
//     connection.release();
//   } catch (error) {
//     console.error('Erro ao conectar ao banco de dados:', error);
//   }
// })();

// module.exports = pool;