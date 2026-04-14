# Prova 2 — MongoDB + Docker

Banco de dados **escola** com a collection **alunos**, utilizando Docker + MongoDB + mongosh.

## Estrutura do Projeto

```
├── docker-compose.yml   # Container MongoDB 7
├── init-db.js           # Script de inicialização (insere 5 alunos)
├── consultas.js         # Script com as 8 consultas da prova
└── README.md            # Documentação com comandos e resultados
```

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## Passo a passo

### 1. Subir o container do MongoDB

```bash
docker compose up -d
```

Isso vai subir o MongoDB 7 na porta `27017` e executar automaticamente o script `init-db.js` que cria o banco `escola` e insere os 5 alunos.

### 2. Acessar o mongosh

```bash
docker exec -it mongo_escola mongosh
```

### 3. Selecionar o banco

```javascript
use escola
```

### 4. Verificar se os alunos foram inseridos

```javascript
db.alunos.find()
```

---

## Dados inseridos

Foram inseridos 5 alunos com o seguinte modelo:

```javascript
{
  "nome": "João Silva",
  "idade": 20,
  "curso": "ADS",
  "notas": [7, 8, 9],
  "endereco": {
    "cidade": "Maricá",
    "estado": "RJ"
  }
}
```

| Nome           | Idade | Curso       | Notas        | Cidade         | Estado |
|----------------|-------|-------------|--------------|----------------|--------|
| João Silva     | 20    | ADS         | [7, 8, 9]    | Maricá         | RJ     |
| Maria Souza    | 22    | ADS         | [9, 10, 8]   | Niterói        | RJ     |
| Pedro Santos   | 19    | Engenharia  | [6, 7, 5]    | São Gonçalo    | RJ     |
| Ana Oliveira   | 23    | ADS         | [10, 9, 10]  | Rio de Janeiro | RJ     |
| Lucas Pereira  | 21    | Medicina    | [8, 7, 9]    | Maricá         | RJ     |

---

## Consultas

### 1. Buscar todos os alunos

```javascript
db.alunos.find()
```

### 2. Buscar alunos do curso "ADS"

```javascript
db.alunos.find({ curso: "ADS" })
```

### 3. Buscar alunos com idade maior que 21

```javascript
db.alunos.find({ idade: { $gt: 21 } })
```

### 4. Atualizar a idade de um aluno

```javascript
db.alunos.updateOne(
  { nome: "João Silva" },
  { $set: { idade: 21 } }
)
```

Verificar:
```javascript
db.alunos.find({ nome: "João Silva" })
```

### 5. Adicionar uma nova nota a um aluno

```javascript
db.alunos.updateOne(
  { nome: "Maria Souza" },
  { $push: { notas: 10 } }
)
```

Verificar:
```javascript
db.alunos.find({ nome: "Maria Souza" })
```

### 6. Remover um aluno

```javascript
db.alunos.deleteOne({ nome: "Pedro Santos" })
```

Verificar:
```javascript
db.alunos.find()
```

### 7. Média de notas por aluno

```javascript
db.alunos.aggregate([
  {
    $project: {
      nome: 1,
      media: { $avg: "$notas" }
    }
  }
])
```

### 8. Quantidade de alunos por curso

```javascript
db.alunos.aggregate([
  {
    $group: {
      _id: "$curso",
      quantidade: { $sum: 1 }
    }
  }
])
```

---

## Executar todas as consultas de uma vez

Copie o arquivo `consultas.js` para dentro do container e execute:

```bash
docker cp consultas.js mongo_escola:/tmp/consultas.js
docker exec -it mongo_escola mongosh < consultas.js
```

Ou diretamente:

```bash
docker exec -i mongo_escola mongosh --file /tmp/consultas.js
```

---

## Parar o container

```bash
docker compose down
```

Para remover os dados persistidos:

```bash
docker compose down -v
```

---

## Tecnologias

- **MongoDB 7**
- **Docker & Docker Compose**
- **mongosh**
