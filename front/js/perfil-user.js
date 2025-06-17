// Verificar autenticação
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch('/usuarios/perfil', { // Alterado de http://localhost:3000
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('user-name').textContent = data.nome || 'Usuário';
            document.getElementById('user-email').textContent = data.email || 'xxxx@xxxx.com';
            document.getElementById('user-phone').textContent = data.telefone || 'xxxx-xxxx';
            if (data.imagem) {
                document.getElementById('profile-img').src = data.imagem;
            }
        } else {
            alert('Erro: ' + data.detalhe);
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.');
        console.error(err);
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
});

// Função para mostrar/esconder o formulário de edição
function editarPerfil() {
    const editSection = document.getElementById('editProfileSection');
    editSection.style.display = editSection.style.display === 'none' ? 'block' : 'none';
}

// Função para salvar alterações
async function salvarAlteracoes() {
    const token = localStorage.getItem('token');
    const newName = document.getElementById('newName').value;
    const newPhone = document.getElementById('newPhone').value;
    const newImg = document.getElementById('newImg').files[0];

    try {
        const formData = new FormData();
        if (newName) formData.append('nome', newName);
        if (newPhone) formData.append('telefone', newPhone);
        if (newImg) formData.append('imagem', newImg);

        const res = await fetch('/usuarios/perfil', { // Alterado de http://localhost:3000
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            alert('Perfil atualizado com sucesso!');
            window.location.reload();
        } else {
            alert('Erro: ' + data.detalhe);
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.');
        console.error(err);
    }
}

// Função para deslogar
function dlt() {
    localStorage.removeItem('token');
    alert('Você foi deslogado com sucesso!');
    window.location.href = 'login.html';
}