const isAdmin = localStorage.getItem("isAdmin");
        
if (isAdmin !== "true") {
    alert("Você não tem permissão para acessar esta página.");
    window.location.href = "admin-login.html"; 
} else {
    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    const tableBody = document.getElementById("denunciaTable").getElementsByTagName("tbody")[0];

    // Função para sanitizar strings
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    denuncias.forEach(denuncia => {
        const row = tableBody.insertRow();

        const tipoAbusoCell = row.insertCell(0);
        tipoAbusoCell.innerHTML = sanitizeHTML(denuncia.tipoAbuso);

        const dataCell = row.insertCell(1);
        dataCell.innerHTML = sanitizeHTML(denuncia.dataIncidente);

        const descricaoCell = row.insertCell(2);
        descricaoCell.innerHTML = sanitizeHTML(denuncia.descricaoIncidente);

        const contatoCell = row.insertCell(3);
        contatoCell.innerHTML = sanitizeHTML(denuncia.contato);
    });
}