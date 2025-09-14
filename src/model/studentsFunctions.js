import { dejesacontinuar, digitandoId } from "../controllers/Interacao.js";
import fs from 'fs';
import path from "path";

const filePath = '../student_manager/data/estudantes.json';
const filePathNovo = path.resolve('data/estudantes_atualizados.json');

export let estudantes = JSON.parse(fs.readFileSync(filePath,'utf-8')) // Lista de estudantes

export const cadastroEstudantes = (nome, idade, notas, email) => { // Arrow Function, função para cadastrar novo estudante.
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
    if(estudantes.length === 0){
        console.log('Não há estudantes cadastrados.');
        
    }else{
        estudantes.forEach(e =>{
            console.log(`id: ${e.id} | nome: ${e.nome} | idade: ${e.idade} | email:${e.email}`)
        });
    }
    dejesacontinuar();
};

export const mostrarEstudantePorId = (id) =>{
    const aluno = estudantes.find(e => e.id === id);
        if(aluno){
            console.log(`id: ${aluno.id} | nome: ${aluno.nome} | idade: ${aluno.idade} | notas: ${aluno.notas} | email: ${aluno.email}`)
        }else{
            console.log(`Estudante com id ${aluno.id} não encontrado.`)
        }
    dejesacontinuar();
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

    dejesacontinuar();
}



export const deletarEstudante = (id) =>{
    const remove = estudantes.filter(e => e.id !== id);

    if(remove.length == estudantes.length){

        console.log('Estudante não encontrado');
         dejesacontinuar();
         return;
    }
    estudantes = remove;

    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8')

    console.log('Estudante removido com sucesso!');
    dejesacontinuar();

} 