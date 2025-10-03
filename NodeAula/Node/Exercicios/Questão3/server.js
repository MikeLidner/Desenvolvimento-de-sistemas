const express = require('express');
const app = express();
const port = 5000;

let post = [
    { id: 1, titulo: 'Primeiro Post', conteudo: 'Conteudo do primeiro post...', autor: 'Carlos'},
    { id: 2, titulo: 'Segundo Post', conteudo: 'Ola, mundo!', autor: 'Ana' }
];

app.use(express.json());

app.get('/posts', (req, res) =>{
    
})