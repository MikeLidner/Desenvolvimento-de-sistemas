const express = require('express');
const app = express();
const port = 3000;

let produtos = [
  { id: 1, nome: 'Teclado Mecânico', preco: 350.00, emEstoque: true },
  { id: 2, nome: 'Mouse Gamer', preco: 180.00, emEstoque: false },
  { id: 3, nome: 'Monitor Ultrawide', preco: 1500.00, emEstoque: true }
];

app.use(express.json());

app.get('/produtos/em-estoque', (req, res) => {
  const emEstoque = produtos.filter(produto => produto.emEstoque === true);
  res.json(emEstoque);
});

app.get('/produtos/pesquisar', (req, res) => {
  const nome = req.query.nome.toLowerCase();
  const resultados = produtos.filter(produto => produto.nome.toLowerCase().includes(nome));
  res.json(resultados);
});

app.patch('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { preco } = req.body;

  const produto = produtos.find(p => p.id == id);
  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }

  produto.preco = preco;
  res.json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, emEstoque, categoria } = req.body;

  if (!categoria) {
    return res.status(400).send('A categoria é obrigatória para a substituição do produto!');
  }

  const produtoIndex = produtos.findIndex(p => p.id == id);
  if (produtoIndex === -1) {
    return res.status(404).send('Produto não encontrado');
  }

  produtos[produtoIndex] = { id, nome, preco, emEstoque, categoria };
  res.json(produtos[produtoIndex]);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

