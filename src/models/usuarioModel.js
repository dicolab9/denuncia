const pool = require('../config/database');

class Usuario {
  static async create({ nome, email, senha, idade }) {
    try {
      const result = await pool.query(
        'INSERT INTO usuarios (nome, email, senha, idade) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, idade',
        [nome, email, senha, idade]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error(error.message || 'Erro ao criar usuário');
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error('Erro ao buscar usuário por email');
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT id, nome, email, idade, telefone, imagem FROM usuarios WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error('Erro ao buscar usuário por ID');
    }
  }

  static async updateProfile(id, { nome, telefone, imagem }) {
    try {
      const result = await pool.query(
        'UPDATE usuarios SET nome = $1, telefone = $2, imagem = $3 WHERE id = $4 RETURNING id',
        [nome, telefone, imagem, id]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error(error.message || 'Erro ao atualizar perfil');
    }
  }

  static async deleteById(id) {
    try {
      const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error(error.message || 'Erro ao deletar usuário');
    }
  }
}

module.exports = Usuario;

// const pool = require('../config/database');

// class Usuario {
//   static async create({ nome, email, senha, idade }) {
//     try {
//       const result = await pool.query(
//         'INSERT INTO usuarios (nome, email, senha, idade) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, idade',
//         [nome, email, senha, idade]
//       );
//       return result.rows[0];
//     } catch (error) {
//       console.error('Erro na query:', error);
//       throw new Error(error.message || 'Erro ao criar usuário');
//     }
//   }

//   static async findByEmail(email) {
//     try {
//       const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
//       return result.rows[0];
//     } catch (error) {
//       throw new Error('Erro ao buscar usuário por email');
//     }
//   }

//   static async findById(id) {
//     try {
//       const result = await pool.query('SELECT id, nome, email, idade, telefone, imagem FROM usuarios WHERE id = $1', [id]);
//       return result.rows[0];
//     } catch (error) {
//       throw new Error('Erro ao buscar usuário por ID');
//     }
//   }

//   static async updateProfile(id, { nome, telefone, imagem }) {
//     try {
//       const result = await pool.query(
//         'UPDATE usuarios SET nome = $1, telefone = $2, imagem = $3 WHERE id = $4 RETURNING id',
//         [nome, telefone, imagem, id]
//       );
//       return result.rowCount > 0;
//     } catch (error) {
//       console.error('Erro na query:', error);
//       throw new Error(error.message || 'Erro ao atualizar perfil');
//     }
//   }
// }

// module.exports = Usuario;