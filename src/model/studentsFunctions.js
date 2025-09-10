
export const estudantes = []; // Lista de estudantes

export const cadastroEstudantes = (nome, idade,notas) => { // Arrow Function, função para cadastrar novo estudante.
        const novoEstudante = { 
        id: Date.now(),
        nome: nome,
        idade: idade,
        notas: notas
    }
    estudantes.push(novoEstudante) // Metódo para salvar o objeto estudante dentro do array estudantes.
    return  estudantes // Fazendo a várivale estudante sair do bloco da função
}


export const mostrarEstudantes = (id = null) =>{ // Arrow fuction para mostrar todos os estudantes ou apenas o estudante do respectivo id
     const estudanteId = estudantes.find(e => e.id === id) //metodo find para encontrar estudante a partir do id, caso o id venha por argumento
    if(!id == null){ //verificando se o id não é null, assim entrando na condição.
      console.log(estudanteId);

    }else if(estudanteId === undefined){ //caso o find retorne undefined, mostra usuario não encontrado
        console.log('Id não encontrado')

    }else{ // caso o id não venha como argumento, mostrar todos os estudantes.
        console.log(estudantes);
    }
    
}


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
    return e; // caso o estudante não seja o certo, ele devolve sem alterações.
})
}



export const deletarEstudante = (id) =>{
    const remove = estudantes.filter(e => e.id !== id); // se o e.id for diferente do id ele coloca em um novo array, caso seja igual, ele não coloca no novo array

} 