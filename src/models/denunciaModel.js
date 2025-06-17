const pool = require('../config/database');

class Denuncia {
  static async create({
    tipoAbuso,
    dataIncidente,
    localIncidente,
    conheceAgressor,
    especificacaoAgressor,
    descricaoIncidente,
    perigoImediato,
    ajudaBuscada,
    contato,
    usuarioId,
  }) {
    try {
      const result = await pool.query(
        `INSERT INTO denuncias (
          tipo_abuso, data_incidente, local_incidente, conhece_agressor,
          especificacao_agressor, descricao_incidente, perigo_imediato,
          ajuda_buscada, contato, usuario_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id`,
        [
          tipoAbuso,
          dataIncidente,
          localIncidente,
          conheceAgressor,
          especificacaoAgressor,
          descricaoIncidente,
          perigoImediato,
          ajudaBuscada,
          contato,
          usuarioId,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro na query:', error);
      throw new Error(error.message || 'Erro ao criar denúncia');
    }
  }
}

module.exports = Denuncia;