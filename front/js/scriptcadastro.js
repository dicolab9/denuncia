function cadastrarUsuario() {
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('senha', senha);

    alert("Cadastro realizado com sucesso!");
    window.location.href = 'login.html'; 
}