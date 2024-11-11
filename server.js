const express = require('express');
const path = require('path');

const app = express();

// Defina o caminho da sua pasta que contém os arquivos HTML, CSS e JS
//const frontendDirectory = path.join('.', 'public');

// Servir arquivos estáticos da pasta "public"
//app.use(express.static(frontendDirectory));
// Inicialize o servidor na porta 5500
const port = 5500;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
})

app.get('/lists.html', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'lists.html'));
})
