const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Usuario = require('../models/usuarioModel');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Apenas imagens JPG, JPEG ou PNG são permitidas'));
    }
    cb(null, true);
  }
});

class UsuarioController {
  static async register(req, res) {
    const { nome, email, senha, idade } = req.body;

    console.log('Requisição recebida:', req.body);

    if (!nome || !email || !senha || !idade) {
      return res.status(400).json({ detalhe: 'Nome, email, senha e idade são obrigatórios' });
    }

    try {
      const usuarioExistente = await Usuario.findByEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ detalhe: 'Email já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash, idade });

      const token = jwt.sign({ id: novoUsuario.id, email: novoUsuario.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', token });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ detalhe: error.message });
    }
  }

  static async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ detalhe: 'Email e senha são obrigatórios' });
    }

    try {
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ detalhe: 'Credenciais inválidas' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ detalhe: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({ mensagem: 'Login bem-sucedido', token });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ detalhe: 'Erro no servidor' });
    }
  }

  static async getProfile(req, res) {
    try {
      const usuario = await Usuario.findById(req.user.id);
      if (!usuario) {
        return res.status(404).json({ detalhe: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ detalhe: error.message });
    }
  }

  static upload = upload.single('imagem'); // Middleware para upload de imagem

  static async updateProfile(req, res) {
    const { nome, telefone } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const updated = await Usuario.updateProfile(req.user.id, { nome, telefone, imagem });
      if (!updated) {
        return res.status(404).json({ detalhe: 'Usuário não encontrado' });
      }
      res.json({ mensagem: 'Perfil atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ detalhe: error.message });
    }
  }

  static async deleteAccount(req, res) {
    try {
      const deleted = await Usuario.deleteById(req.user.id);
      if (!deleted) {
        return res.status(404).json({ detalhe: 'Usuário não encontrado' });
      }
      res.json({ mensagem: 'Conta deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      res.status(500).json({ detalhe: error.message });
    }
  }
}

module.exports = UsuarioController;

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const Usuario = require('../models/usuarioModel');

// // Configuração do multer para upload de imagens
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//       return cb(new Error('Apenas imagens JPG, JPEG ou PNG são permitidas'));
//     }
//     cb(null, true);
//   }
// });

// class UsuarioController {
//   static async register(req, res) {
//     const { nome, email, senha, idade } = req.body;

//     console.log('Requisição recebida:', req.body);

//     if (!nome || !email || !senha || !idade) {
//       return res.status(400).json({ detalhe: 'Nome, email, senha e idade são obrigatórios' });
//     }

//     try {
//       const usuarioExistente = await Usuario.findByEmail(email);
//       if (usuarioExistente) {
//         return res.status(400).json({ detalhe: 'Email já cadastrado' });
//       }

//       const senhaHash = await bcrypt.hash(senha, 10);
//       const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash, idade });

//       const token = jwt.sign({ id: novoUsuario.id, email: novoUsuario.email }, process.env.JWT_SECRET, {
//         expiresIn: '1h'
//       });

//       res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', token });
//     } catch (error) {
//       console.error('Erro no registro:', error);
//       res.status(500).json({ detalhe: error.message });
//     }
//   }

//   static async login(req, res) {
//     const { email, senha } = req.body;

//     if (!email || !senha) {
//       return res.status(400).json({ detalhe: 'Email e senha são obrigatórios' });
//     }

//     try {
//       const usuario = await Usuario.findByEmail(email);
//       if (!usuario) {
//         return res.status(401).json({ detalhe: 'Credenciais inválidas' });
//       }

//       const senhaValida = await bcrypt.compare(senha, usuario.senha);
//       if (!senhaValida) {
//         return res.status(401).json({ detalhe: 'Credenciais inválidas' });
//       }

//       const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
//         expiresIn: '1h'
//       });

//       res.json({ mensagem: 'Login bem-sucedido', token });
//     } catch (error) {
//       console.error('Erro no login:', error);
//       res.status(500).json({ detalhe: 'Erro no servidor' });
//     }
//   }

//   static async getProfile(req, res) {
//     try {
//       const usuario = await Usuario.findById(req.user.id);
//       if (!usuario) {
//         return res.status(404).json({ detalhe: 'Usuário não encontrado' });
//       }
//       res.json(usuario);
//     } catch (error) {
//       console.error('Erro ao buscar perfil:', error);
//       res.status(500).json({ detalhe: error.message });
//     }
//   }

//   static upload = upload.single('imagem'); // Middleware para upload de imagem

//   static async updateProfile(req, res) {
//     const { nome, telefone } = req.body;
//     const imagem = req.file ? `/uploads/${req.file.filename}` : null;

//     try {
//       const updated = await Usuario.updateProfile(req.user.id, { nome, telefone, imagem });
//       if (!updated) {
//         return res.status(404).json({ detalhe: 'Usuário não encontrado' });
//       }
//       res.json({ mensagem: 'Perfil atualizado com sucesso' });
//     } catch (error) {
//       console.error('Erro ao atualizar perfil:', error);
//       res.status(500).json({ detalhe: error.message });
//     }
//   }
// }

// module.exports = UsuarioController;