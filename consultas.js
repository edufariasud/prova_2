// ============================================
// Consultas da prova — banco "escola"
// Executar com: mongosh < consultas.js
// ou copiar e colar no mongosh
// ============================================

use("escola");

// -----------------------------------------------
// 1. Buscar todos os alunos
// -----------------------------------------------
print("\n========== 1. Buscar todos os alunos ==========");
db.alunos.find().forEach(printjson);

// -----------------------------------------------
// 2. Buscar alunos do curso "ADS"
// -----------------------------------------------
print("\n========== 2. Buscar alunos do curso ADS ==========");
db.alunos.find({ curso: "ADS" }).forEach(printjson);

// -----------------------------------------------
// 3. Buscar alunos com idade maior que 21
// -----------------------------------------------
print("\n========== 3. Buscar alunos com idade maior que 21 ==========");
db.alunos.find({ idade: { $gt: 21 } }).forEach(printjson);

// -----------------------------------------------
// 4. Atualizar a idade de um aluno
// -----------------------------------------------
print("\n========== 4. Atualizar a idade de um aluno ==========");
db.alunos.updateOne(
  { nome: "João Silva" },
  { $set: { idade: 21 } }
);
print("Idade do João Silva atualizada para 21:");
db.alunos.find({ nome: "João Silva" }).forEach(printjson);

// -----------------------------------------------
// 5. Adicionar uma nova nota a um aluno
// -----------------------------------------------
print("\n========== 5. Adicionar uma nova nota a um aluno ==========");
db.alunos.updateOne(
  { nome: "Maria Souza" },
  { $push: { notas: 10 } }
);
print("Nova nota adicionada para Maria Souza:");
db.alunos.find({ nome: "Maria Souza" }).forEach(printjson);

// -----------------------------------------------
// 6. Remover um aluno
// -----------------------------------------------
print("\n========== 6. Remover um aluno ==========");
db.alunos.deleteOne({ nome: "Pedro Santos" });
print("Pedro Santos removido. Alunos restantes:");
db.alunos.find({}, { nome: 1, _id: 0 }).forEach(printjson);

// -----------------------------------------------
// 7. Média de notas por aluno
// -----------------------------------------------
print("\n========== 7. Média de notas por aluno ==========");
db.alunos.aggregate([
  {
    $project: {
      nome: 1,
      media: { $avg: "$notas" }
    }
  }
]).forEach(printjson);

// -----------------------------------------------
// 8. Quantidade de alunos por curso
// -----------------------------------------------
print("\n========== 8. Quantidade de alunos por curso ==========");
db.alunos.aggregate([
  {
    $group: {
      _id: "$curso",
      quantidade: { $sum: 1 }
    }
  }
]).forEach(printjson);
