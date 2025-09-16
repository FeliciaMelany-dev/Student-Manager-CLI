# 📚 Student Manager CLI

Um sistema de **gerenciamento de estudantes** feito em **Node.js** com persistência em **JSON**, que roda diretamente no terminal (linha de comando).  

Permite **cadastrar, listar, atualizar, deletar e gerar relatórios de estudantes** com base em suas informações e notas.  

---

## 🚀 Funcionalidades

✔️ **Cadastrar estudantes** com validação de dados (nome, idade, notas, e-mail).  
✔️ **Listar todos os estudantes** (dados originais + atualizados).  
✔️ **Buscar estudante por ID**.  
✔️ **Atualizar dados** (nome, idade, notas e e-mail).  
✔️ **Deletar estudante** pelo ID.  
✔️ **Gerar relatórios**:  
- Situação escolar individual (Aprovado, Recuperação, Reprovado).  
- Situação da turma (status de cada estudante).  
- Média individual.  
- Média da turma.  
- Ranking Top 3 melhores estudantes.  

---

## 📂 Estrutura do Projeto

student_manager/
│── controllers/
│ ├── Interacao.js # Menu e interação com o usuário via terminal
│ ├── Relatorios.js # Relatórios (individual e turma)
│ ├── Calculo.js # Funções de cálculo (médias e ranking)
│── data/
│ ├── estudantes.json # Banco de dados principal (cadastro)
│ ├── estudantes_atualizados.json # Banco de dados atualizado (edições)
│── models/
│ ├── Estudante.js # CRUD e validações de estudantes
│── index.js # Ponto de entrada do sistema
│── README.md # Documentação do projeto


---

## ⚙️ Tecnologias Utilizadas

- **Node.js** (ESM – import/export nativo)  
- **Módulo fs** (File System – para persistência dos dados)  
- **Módulo path** (gerenciamento de caminhos)  
- **readline** (para interação no terminal)  
- **JSON** (banco de dados local e simples)  

---

## 📥 Instalação e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/student_manager.git
cd student_manager

2️⃣ Rodar o programa
node index.js

🖥️ Exemplo de Uso
Menu Principal
=== MENU ESTUDANTE ===
1 - Cadastrar Estudante
2 - Listar Estudantes
3 - Buscar Estudante por ID
4 - Atualizar Estudante
5 - Deletar Estudante
6 - Relatórios
7 - Sair

Cadastro de Estudante
Digite o nome do estudante: João Silva
Digite a idade do estudante: 18
Digite as notas do estudante mediante aos 4 semestres: 8, 7, 9, 6
Digite o email do estudante: joao@email.com
Estudante cadastrado com sucesso!

Relatório Individual
=== Relatório do Estudante ===
Nome: João Silva
ID: 123456789
Notas: 8, 7, 9, 6
Média: 7.50
Status: Aprovado

✅ Validações Implementadas

Nome: não pode ser vazio.

Idade: deve ser um número inteiro positivo.

Notas: devem ser números entre 0 e 10.

E-mail: não pode ser vazio e deve conter @.

🛠️ Próximos Passos (Ideias de Melhorias)

 Usar banco de dados real (MongoDB).

 Adicionar testes automatizados (Jest).

 Criar interface web usando Express.js.

 Exportar relatórios em PDF/Excel.

📌 Autor: Felicia Melany da Silva Cunha
💡 Projeto desenvolvido para prática de Node.js, persistência de dados e boas práticas de programação.


🙏 Este projeto foi desenvolvido como tarefa proposta pelo programa Programadores do Amanhã, ao qual sou muito grata pela oportunidade e aprendizado.