import express from 'express';

const app = express();
const porta = 3000;

const atividades = [
    { id: 1, titulo: "fazer trabalho de matemática", concluida: false },
    { id: 2, titulo: "estudar para a prova", concluida: true },
    { id: 3, titulo: "organizar o quarto", concluida: false }
];

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: "API de Atividades no ar"
    });
});

app.get('/atividades', (req, res) => {
    res.status(200).json(atividades);
});

app.get('/atividades/busca', (req, res) => {
    const titulo = req.query.titulo;

    if (!titulo) {
        return res.status(400).json({
            erro: "Informe um título para realizar a busca."
        });
    }

    const resultado = atividades.filter((atividade) =>
        atividade.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    res.status(200).json(resultado);
});

app.post('/atividades', (req, res) => {
    const novaAtividade = req.body;

    if (!novaAtividade.titulo) {
        return res.status(400).json({
            erro: "O campo 'titulo' é obrigatório."
        });
    }

    const atividadeCriada = {
        id: atividades.length + 1,
        titulo: novaAtividade.titulo,
        concluida: novaAtividade.concluida ?? false
    };

    atividades.push(atividadeCriada);

    res.status(201).json(atividadeCriada);
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});

app.listen(porta, () => {
    console.log(`Servidor funcionando na porta ${porta}`);
});