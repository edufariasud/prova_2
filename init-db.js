// ============================================
// Script de inicialização do banco "escola"
// Cria a collection "alunos" e insere 5 alunos
// ============================================

db = db.getSiblingDB("escola");

db.alunos.drop();

db.alunos.insertMany([
  {
    nome: "João Silva",
    idade: 20,
    curso: "ADS",
    notas: [7, 8, 9],
    endereco: {
      cidade: "Maricá",
      estado: "RJ"
    }
  },
  {
    nome: "Maria Souza",
    idade: 22,
    curso: "ADS",
    notas: [9, 10, 8],
    endereco: {
      cidade: "Niterói",
      estado: "RJ"
    }
  },
  {
    nome: "Pedro Santos",
    idade: 19,
    curso: "Engenharia",
    notas: [6, 7, 5],
    endereco: {
      cidade: "São Gonçalo",
      estado: "RJ"
    }
  },
  {
    nome: "Ana Oliveira",
    idade: 23,
    curso: "ADS",
    notas: [10, 9, 10],
    endereco: {
      cidade: "Rio de Janeiro",
      estado: "RJ"
    }
  },
  {
    nome: "Lucas Pereira",
    idade: 21,
    curso: "Medicina",
    notas: [8, 7, 9],
    endereco: {
      cidade: "Maricá",
      estado: "RJ"
    }
  }
]);

print("=== 5 alunos inseridos com sucesso no banco 'escola' ===");
