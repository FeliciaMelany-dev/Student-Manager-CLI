import { desejaContinuar, digitandoId } from "../controllers/Interacao.js";
import fs from 'fs';
import path from "path";
import {carregarEstudantes} from '../controllers/Relatorios.js'
import { log } from "console";

const filePath = '../student_manager/data/estudantes.json';
const filePathNovo = path.resolve('data/estudantes_atualizados.json');

export let estudantes = JSON.parse(fs.readFileSync(filePath,'utf-8')) // Lista de estudantes


const validarNome = (nome) =>{
    if(!nome || nome.trim() === ""){
        console.log("Nome inválido! Não pode ser vazio");
        return false
    }
    return true;
}

const validarIdade = (idade) => {
    if(isNaN(idade) || idade <= 0 || !Number.isInteger(idade)){
        return false;
    }
    return true; 
}

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
}
export const cadastroEstudantes = (nome, idade, notas, email) => { // Arrow Function, função para cadastrar novo estudante.
    if(!validarNome(nome) || !validarIdade(idade) || !validarNotas(notas) || !validarEmail(email)) {

        console.log('Não foi possível cadastrar o estudantes. Verifique os dados!')
        return;
    }
        const novoEstudante = { 
        id: Date.now(),
        nome: nome,
        idade: idade,
        notas: notas,
        email:email
    }
    estudantes.push(novoEstudante)
    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8') // Metódo para salvar o objeto estudante dentro do array estudantes.
    return  estudantes // Fazendo a várivale estudante sair do bloco da função
}


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
    desejaContinuar();
};

export const mostrarEstudantePorId = (id) =>{
    const estudantes_atualizados = carregarEstudantes();
    const alunoOriginal = estudantes.find(e => e.id === id);
    const alunoAtualizado = estudantes_atualizados.find(e => e.id === id);
    const alunoParaMostrar = alunoAtualizado || alunoOriginal;

        if(alunoParaMostrar){
            console.log(`id: ${alunoParaMostrar.id} | nome: ${alunoParaMostrar.nome} | idade: ${alunoParaMostrar.idade} | notas: ${alunoParaMostrar.notas} | email: ${alunoParaMostrar.email}`)
        }else{
            console.log(`Estudante com id ${aluno.id} não encontrado.`)
        }
    desejaContinuar();
};



export const atualizarEstudante = (id, nomeNovo, idadeNova, notasNova, emailNovo) =>{ 

     let estudantesAtualizados = estudantes.map(e => {
     if(e.id===id){ //se o e.id for igual a id passado no parametro execute...
        return{ // retorna para fora do bloco
            ...e, //copia todos os dados antigos
        nome: nomeNovo || e.nome,
        idade: idadeNova !== undefined ? idadeNova : e.idade,
        notas: notasNova || e.notas,
        email: emailNovo || e.email
        }
    }
    return e; // caso o estudante não seja o certo, ele devolve sem alterações.
})
    fs.writeFileSync(filePathNovo, JSON.stringify(estudantesAtualizados, null, 2));

   const atualizado = estudantesAtualizados.find( e => e.id == id);
   if(!atualizado){
    console.log('Estudante não encontrado');
    return;
   }

    console.log('Estudante atualizado com sucesso');

    console.log(`\nID: ${atualizado.id} | ${atualizado.nome} | ${atualizado.idade} | ${atualizado.notas} | ${atualizado.email} `);

    desejaContinuar();
}



export const deletarEstudante = (id) =>{
    const remove = estudantes.filter(e => e.id !== id);

    if(remove.length == estudantes.length){

        console.log('Estudante não encontrado');
         desejaContinuar();
         return;
    }
    estudantes = remove;

    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8')

    console.log('Estudante removido com sucesso!');
    desejaContinuar();
} 