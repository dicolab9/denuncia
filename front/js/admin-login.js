      const adminUsername = "admin";
        const admiPassword = "admin2024";

        // Adiciona o evento de submit ao formulário
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio do formulário tradicional

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Verifica se as credenciais são corretas
            if (username === adminUsername && password === adminPassword) {
                localStorage.setItem("isAdmin", "true");
                // Redireciona para a página de administração
                window.location.href = "Perfil_adm.html";
            } else {
                alert("Usuário ou senha incorretos!");
            }
        });

        // Função para validar e sanitizar dados antes de salvar no localStorage
        function validateAndSaveDenuncias(denuncias) {
            const sanitizedDenuncias = denuncias.map(denuncia => ({
                tipoAbuso: sanitizeHTML(denuncia.tipoAbuso),
                dataIncidente: sanitizeHTML(denuncia.dataIncidente),
                descricaoIncidente: sanitizeHTML(denuncia.descricaoIncidente),
                contato: sanitizeHTML(denuncia.contato)
            }));
            localStorage.setItem("denuncias", JSON.stringify(sanitizedDenuncias));
        }

        // Função para sanitizar strings
        function sanitizeHTML(str) {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        }
