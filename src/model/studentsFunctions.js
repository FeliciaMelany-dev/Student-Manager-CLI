import { dejesacontinuar, digitandoId } from "../controllers/Interacao.js";
import fs from 'fs';

const filePath = '../student_manager/data/estudantes.json';

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
    digitandoId();
    const aluno = estudantes.find(e => e.id === id);
        if(aluno){
            console.log(`id: ${aluno.id} | nome: ${aluno.nome} | idade: ${aluno.idade}`)
        }else{
            console.log(`Estudante com id ${aluno.id} não encontrado.`)
        }
    dejesacontinuar();
};



export const atualizarEstudante = (id, nomeNovo, idadeNova, notasNova) =>{ //procura estudante pelo id e passa por argumento o novo id criado
    const estudante = estudantes.map(e => {//
     if(e.id===id){ //se o e.id for igual a id passado no parametro execute...
        return{ // retorna para fora do bloco
            ...e, //copia todos os dados antigos
        nome: nomeNovo,
        idade: idadeNova,
        notas: notasNova
        }
    }
    dejesacontinuar();
    return e; // caso o estudante não seja o certo, ele devolve sem alterações.
})
}



export const deletarEstudante = (id) =>{
    const remove = estudantes.filter(e => e.id !== id);// se o e.id for diferente do id ele coloca em um novo array, caso seja igual, ele não coloca no novo array
    if(remove.length == estudantes.length){

        console.log('Estudante não encontrado');
         dejesacontinuar();
    }
    fs.writeFileSync(filePath, JSON.stringify(estudantes, null, 2), 'utf-8')

    console.log('Estudante removido com sucesso!');
    dejesacontinuar();

} 