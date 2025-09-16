// Importa funções utilitárias de interação com o usuário
import { desejaContinuar, digitandoId } from "../controllers/Interacao.js";
 // Módulo nativos do Node.js
import fs from 'fs'; // Manipulação de arquivos (ler, escrever, atualizar e deletar)
import path from "path"; // Para trabahar com caminhos de arquivos de forma segura
// Função que carrega dados do arquivo atualizado (usada para mostrar estudantes)
import {carregarEstudantes} from '../controllers/Relatorios.js'


// Caminhos dos arquivos de persistência
const filePath = '../student_manager/data/estudantes.json';
const filePathNovo = path.resolve('data/estudantes_atualizados.json');

// Carrga os estudantes salvos inicialmente no arquivo estudantes.json
// Esse array é a "base original" de dados
export let estudantes = JSON.parse(fs.readFileSync(filePath,'utf-8')) // Lista de estudantes

// Valida se o nome não é vazio
const validarNome = (nome) =>{
    if(!nome || nome.trim() === ""){
        console.log("Nome inválido! Não pode ser vazio");
        return false
    }
    return true;
;}

// Valida se a idade é um número positivo e inteiro
const validarIdade = (idade) => {
    if(isNaN(idade) || idade <= 0 || !Number.isInteger(idade)){
        return false;
    }
    return true; 
};

// Valida se as notas são um array de números entre 0 e 10
const validarNotas = (notas) => {
    if(!Array.isArray(notas) || notas.length === 0){
        console.log('Notas inválidas!')
        return false;
    }
    for (let n of notas){
        if(isNaN(n) || n<0 || n>10){
            console.log('Notas inválidas! Cada nota deve estar entre 0 e 10');
            return false
            
        };
    };
    return true;
};

// Valida se  o email não é vazio e ccontém '@'
const validarEmail = (email) => {
    if(!email || email.trim()=== ''){
        console.log('O email não pode ser vazio');
        return false;
    }
    if(!email.includes("@")){
        console.log('O email deve conter "@"');
        return false;
        
    }
    return true;
};


export const cadastroEstudantes = (nome, idade, notas, email) => { 
    if(!validarNome(nome) || !validarIdade(idade) || !validarNotas(notas) || !validarEmail(email)) {

        console.log('Não foi possível cadastrar o estudantes. Verifique os dados!')
        return;
    }
    // Criando um novo estudante com ID único baseado no timestamp (tempo em milissegundos), para conseguir realizar funções para usuário único
        const novoEstudante = { 
        id: Date.now(),
        nome: nome,
        idade: idade,
        notas: notas,
        email:email
    }
    // Insere o estudante no array em memória
    estudantes.push(novoEstudante)
    
    // Salva no arquivo estudantes.json para garantir que não seja fechado (persistência)
    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8') 

    return  estudantes // Retorna a lista atualizada
};

// Mostra todos os estudantes (base + atualizações feitas em outro arquivo JSON, mantendo histórico original.)
export const mostrarEstudantes = () =>{ 
    const estudantes_atualizados = carregarEstudantes();

    if(estudantes.length === 0){
        console.log('Não há estudantes cadastrados.');
        
    }else{

        estudantes.forEach(e =>{
            const atualizado = estudantes_atualizados.find(a => a.id === e.id);
            const estudantesParaMostrar = atualizado || e;
            
            console.log(`id: ${estudantesParaMostrar.id} | nome: ${estudantesParaMostrar.nome} | idade: ${estudantesParaMostrar.idade} | email:${estudantesParaMostrar.email}`)
        });
    }
    console.log('\n');
    
    desejaContinuar();
};

// Mostra apenas 1 estudante pelo ID
export const mostrarEstudantePorId = (id) =>{
    const estudantes_atualizados = carregarEstudantes();
    const alunoOriginal = estudantes.find(e => e.id === id);
    console.log('\n=== MOSTRANDO ESTUDANTE ===\n')
    const alunoAtualizado = estudantes_atualizados.find(e => e.id === id);

    //Se houver versão atualizada, usa ela; senão, usa o original
    const alunoParaMostrar = alunoAtualizado || alunoOriginal;

        if(alunoParaMostrar){
            console.log(`id: ${alunoParaMostrar.id} | nome: ${alunoParaMostrar.nome} | idade: ${alunoParaMostrar.idade} | notas: ${alunoParaMostrar.notas} | email: ${alunoParaMostrar.email}`)
        }else{
            console.log(`Estudante com id ${aluno.id} não encontrado.`)
        }
        console.log('\n')
    desejaContinuar();
};



export const atualizarEstudante = (id, nomeNovo, idadeNova, notasNova, emailNovo) =>{ 
// Cria uma nova lsita com estudantes atualizados
    const idNumber = Number(id);
    const estudantes_atualizados = carregarEstudantes(); 
     let estudantesAtualizados = estudantes.map(e => { //Utilizando map para retornar um array já com as alterações, sem precisar alterar o original evitando efeitos colaterais
     if(e.id===idNumber){ 
        return{ 
            ...e, // Copia os dados antigos
        nome: nomeNovo || e.nome,
        idade: idadeNova !== undefined ? idadeNova : e.idade,
        notas: notasNova || e.notas,
        email: emailNovo || e.email
        }
    }
    return e; 
});

    // Salva em um novo arquivo de atualização, para não sobrescrever os dados originais
    fs.writeFileSync(filePathNovo, JSON.stringify(estudantesAtualizados, null, 2));

   const atualizado = estudantesAtualizados.find( e => e.id === idNumber);
   if(!atualizado){
    console.log('\nEstudante não encontrado');
    desejaContinuar();
    return;
   }

    console.log('\nEstudante atualizado com sucesso');

    console.log(`\nID: ${atualizado.id} | ${atualizado.nome} | ${atualizado.idade} | ${atualizado.notas} | ${atualizado.email} `);

    desejaContinuar();
}



export const deletarEstudante = (id) =>{
    // Remove o estudante filtrando por ID
    const remove = estudantes.filter(e => e.id !== id);
    // Se nenhum estudante foi removido, significa que o ID não existe
    if(remove.length == estudantes.length){

        console.log('Estudante não encontrado');
         desejaContinuar();
         return;
    };

    // Atualiza a lista global
    estudantes = remove;

    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8')

    console.log('Estudante removido com sucesso!');
    desejaContinuar();
} 