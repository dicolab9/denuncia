const Denuncia = require('../models/denunciaModel');
const jwt = require('jsonwebtoken');

class DenunciaController {
  static async create(req, res) {
    const {
      tipo_abuso,
      data_incidente,
      local_incidente,
      conhece_agressor,
      especificacao_agressor,
      descricao_incidente,
      perigo_imediato,
      ajuda_buscada,
      contato
    } = req.body;

    // Validação básica
    if (
      !tipo_abuso ||
      !data_incidente ||
      !local_incidente ||
      !conhece_agressor ||
      !descricao_incidente ||
      !perigo_imediato ||
      !contato
    ) {
      return res.status(400).json({ detalhe: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    try {
      // Extrair usuário do token, se fornecido
      let usuario_id = null;
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        usuario_id = decoded.id;
      }

      const denuncia = await Denuncia.create({
        usuario_id,
        tipo_abuso,
        data_incidente,
        local_incidente,
        conhece_agressor,
        especificacao_agressor,
        descricao_incidente,
        perigo_imediato,
        ajuda_buscada,
        contato
      });

      res.status(201).json({ mensagem: 'Denúncia criada com sucesso', id: denuncia.id });
    } catch (error) {
      res.status(500).json({ detalhe: error.message });
    }
  }
}

module.exports = DenunciaController;