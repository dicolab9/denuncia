document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('a[href="login.html"]');
    const userMenu = document.getElementById('userMenu');
  
    if (token) {
      loginLink.style.display = 'none';
      userMenu.style.display = 'block';
      // Opcional: buscar nome do usuário do backend usando o token
    } else {
      loginLink.style.display = 'block';
      userMenu.style.display = 'none';
    }
  });

function validarFormulario() {
    const denuncia = document.getElementById('denuncia').value;
    if (denuncia.trim() === '') {
        alert('Por favor, descreva a sua denúncia.');
        return false;
    }
    
    return true;
}

function leiaMais() {
    var pontos = document.getElementById("pontos");
    var maisTexto = document.getElementById("mais");
    var btnLeiaMais = document.getElementById("btnLeiaMais");

    if (pontos.style.display === "none") {
        pontos.style.display = "inline";
        maisTexto.style.display = "none";
        btnLeiaMais.innerHTML = "Leia Mais";
    } else {
        pontos.style.display = "none";
        maisTexto.style.display = "inline";
        btnLeiaMais.innerHTML = "Leia Menos";
    }
}
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });
  
