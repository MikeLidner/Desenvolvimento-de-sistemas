const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Para entender o corpo da requisição no formato JSON

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

let tarefas = [
    { id: 1, titulo: 'Estudar Express', concluida: false },
    { id: 2, titulo: 'Fazer exercícios', concluida: false }
  ];

  // Rota para obter todas as tarefas
app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas);
  });
  

  // Rota para obter uma tarefa pelo id
app.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }
    res.status(200).json(tarefa);
  });
  

  // Rota para criar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { titulo, concluida } = req.body;
    const novoId = tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1; // Gerar ID único
    const novaTarefa = { id: novoId, titulo, concluida };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  });

  // Rota para atualizar uma tarefa
app.put('/tarefas/:id', (req, res) => {
    const { titulo, concluida } = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }
  
    tarefa.titulo = titulo !== undefined ? titulo : tarefa.titulo;
    tarefa.concluida = concluida !== undefined ? concluida : tarefa.concluida;
  
    res.status(200).json(tarefa);
  });

  // Rota para deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send('Tarefa não encontrada');
    }
  
    const tarefaRemovida = tarefas.splice(index, 1);
    res.status(204).send(); // 204 indica que a remoção foi bem-sucedida e não há corpo na resposta
  });