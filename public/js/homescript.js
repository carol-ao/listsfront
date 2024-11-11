let email = document.getElementById("email")
let password = document.getElementById("password")
let loginBtn = document.getElementById("loginBtn")

class LoginForm {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
console.log("linked")

loginBtn.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("estoy aqui")
    let loginForm = new LoginForm(email.value,password.value)
    let body = JSON.stringify(loginForm) 
    console.log(body)

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body // Certifique-se de que "body" seja uma string JSON válida, como JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.text(); // Retorna uma Promise com o texto da resposta
    })
    .then(token => {
        console.log("Token recebido:", token);
        localStorage.setItem("token", token); // Armazena o token no localStorage
        localStorage.setItem("username",email.value) //Armazena email como username no localStorage
        window.location.href = '/lists.html';
    })
    .catch(error => {
        console.log(error.message);
    });
})
