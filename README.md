# Prova 2 — MongoDB

Banco de dados com Docker e MongoDB para gerenciar alunos de uma escola.

## Como rodar

Suba o container:
```bash
docker compose up -d
```

Entre no mongosh:
```bash
docker exec -it mongo_escola mongosh
```

Selecione o banco:
```javascript
use escola
```

## Consultas

```javascript
// 1. Todos os alunos
db.alunos.find().pretty()

// 2. Alunos do curso ADS
db.alunos.find({ curso: "ADS" })

// 3. Alunos com idade maior que 21
db.alunos.find({ idade: { $gt: 21 } })

// 4. Atualizar a idade de um aluno
db.alunos.updateOne({ nome: "João Silva" }, { $set: { idade: 21 } })

// 5. Adicionar uma nota a um aluno
db.alunos.updateOne({ nome: "Maria Souza" }, { $push: { notas: 10 } })

// 6. Remover um aluno
db.alunos.deleteOne({ nome: "Pedro Santos" })

// 7. Média de notas por aluno
db.alunos.aggregate([{ $project: { nome: 1, media: { $avg: "$notas" } } }])

// 8. Quantidade de alunos por curso
db.alunos.aggregate([{ $group: { _id: "$curso", quantidade: { $sum: 1 } } }])
```

## Tecnologias

- MongoDB 7
- Docker
- mongosh
