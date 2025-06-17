document.getElementById('denunciaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = {
      tipo_abuso: document.querySelector('input[name="tipoAbuso"]:checked')?.value,
      data_incidente: document.getElementById('dataIncidente').value,
      local_incidente: document.getElementById('localIncidente').value,
      conhece_agressor: document.querySelector('input[name="conheceAgressor"]:checked')?.value,
      especificacao_agressor: document.getElementById('especificacaoAgressor').value,
      descricao_incidente: document.getElementById('descricaoIncidente').value,
      perigo_imediato: document.querySelector('input[name="perigoImediato"]:checked')?.value,
      ajuda_buscada: document.getElementById('ajudaBuscada').value,
      contato: document.getElementById('contato').value
    };
  
    // Validação básica no frontend
    if (
      !formData.tipo_abuso ||
      !formData.data_incidente ||
      !formData.local_incidente ||
      !formData.conhece_agressor ||
      !formData.descricao_incidente ||
      !formData.perigo_imediato ||
      !formData.contato
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const res = await fetch('/api/denuncias', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Denúncia enviada com sucesso!');
        document.getElementById('denunciaForm').reset();
      } else {
        alert('Erro: ' + data.detalhe);
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  });