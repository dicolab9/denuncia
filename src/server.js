const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const usuarioRoutes = require('./routes/usuarioRoutes');
const denunciaRoutes = require('./routes/denunciaRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // Ex.: https://seu-app.onrender.com
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../front')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/perfil-user.html', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../front', 'perfil-user.html'));
});

app.use('/usuarios', usuarioRoutes);
app.use('/api', denunciaRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const usuarioRoutes = require('./routes/usuarioRoutes');
// const denunciaRoutes = require('./routes/denunciaRoutes');
// const authMiddleware = require('./middlewares/authMiddleware');

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Servir arquivos estáticos da pasta front
// app.use(express.static(path.join(__dirname, '../front')));
// // Servir arquivos de imagem da pasta uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Rotas protegidas
// app.get('/perfil-user.html', authMiddleware, (req, res) => {
//   res.sendFile(path.join(__dirname, '../front', 'perfil-user.html'));
// });

// // Rotas públicas
// app.use('/usuarios', usuarioRoutes);
// app.use('/api', denunciaRoutes);

// // Rota para a página inicial
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front', 'index.html'));
// });

// // Iniciar servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const path = require('path');
// // const usuarioRoutes = require('./routes/usuarioRoutes');
// // const denunciaRoutes = require('./routes/denunciaRoutes');

// // dotenv.config();

// // const app = express();

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // Servir arquivos estáticos da pasta front
// // app.use(express.static(path.join(__dirname, '../front')));

// // // Rotas
// // app.use('/usuarios', usuarioRoutes);
// // app.use('/api', denunciaRoutes);

// // // Rota para a página inicial
// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../front', 'index.html'));
// // });

// // // Iniciar servidor
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Servidor rodando na porta ${PORT}`);
// // });