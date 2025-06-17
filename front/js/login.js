document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        const res = await fetch('/usuarios/login', { // Alterado de http://localhost:3000
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
            window.location.href = 'perfil-user.html';
        } else {
            alert('Erro: ' + data.detalhe);
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.');
        console.error(err);
    }
});

// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const email = document.getElementById('loginEmail').value;
//     const senha = document.getElementById('loginSenha').value;

//     try {
//         const res = await fetch('http://localhost:3000/usuarios/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, senha })
//         });

//         const data = await res.json();
//         if (res.ok) {
//             localStorage.setItem('token', data.token);
//             alert('Login bem-sucedido!');
//             window.location.href = 'perfil-user.html'; // Alterado para perfil-user.html
//         } else {
//             alert('Erro: ' + data.detalhe);
//         }
//     } catch (err) {
//         alert('Erro ao conectar com o servidor.');
//         console.error(err);
//     }
// });

// // document.getElementById('loginForm').addEventListener('submit', async function (e) {
// //     e.preventDefault();

// //     const email = document.getElementById('loginEmail').value;
// //     const senha = document.getElementById('loginSenha').value;

// //     try {
// //         const res = await fetch('http://localhost:3000/usuarios/login', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ email, senha })
// //         });

// //         const data = await res.json();
// //         if (res.ok) {
// //             localStorage.setItem('token', data.token);
// //             alert('Login bem-sucedido!');
// //             window.location.href = 'dashboard.html'; // Redirecione para a página desejada
// //         } else {
// //             alert('Erro: ' + data.detalhe);
// //         }
// //     } catch (err) {
// //         alert('Erro ao conectar com o servidor.');
// //         console.error(err);
// //     }
// // });

// // // async function Login() {
// // //     const email = document.getElementById('loginUsuario').value;
// // //     const senha = document.getElementById('loginSenha').value;

// // //     try {
// // //         const res = await fetch('http://localhost:3000/usuarios/login', {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ email, senha })
// // //         });

// // //         const data = await res.json();
// // //         if (res.ok) {
// // //             localStorage.setItem('token', data.token);
// // //             alert('Login bem-sucedido!');
// // //             window.location.href = 'dashboard.html'; // Redirecione para a página desejada
// // //         } else {
// // //             alert('Erro: ' + data.detalhe);
// // //         }
// // //     } catch (err) {
// // //         alert('Erro ao conectar com o servidor.');
// // //     }
// // // }

// // // // function Login() {
// // // //     const usuario = document.getElementById('loginUsuario').value;
// // // //     const senha = document.getElementById('loginSenha').value;

// // // //     const usuarioCadastrado = localStorage.getItem('usuario');
// // // //     const senhaCadastrada = localStorage.getItem('senha');

 
// // // //     if (usuario === usuarioCadastrado && senha === senhaCadastrada) {
// // // //         alert("Login bem-sucedido!");
// // // //         window.location.href = 'Perfil-user.html'; 
// // // //     } 
// // // //     else {
// // // //         alert("Usuário ou senha incorretos!");
// // // //     }
// // // // }