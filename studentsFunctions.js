
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


export const mostrarEstudantes = (id = null) =>{ // Arrow fuction para mostrar todos os estudantes ou apenas o estudante cdo respectivo id
     const estudanteId = estudantes.find(e => e.id === id)
    if(!id == null){
      console.log(estudanteId);
    }else if(estudanteId === undefined){
        console.log('Id não encontrado')

    }else{
        console.log(estudantes);
    }
    
}
mostrarEstudantes();


export const atualizarEstudante = (id, idNovo, nomeNovo, idadeNova, notasNova) =>{
    const estudante = estudantes.find(e => e.id === id);
    if(estudante){
        estudante.id = idNovo;
        estudante.nome = nomeNovo;
        estudante.idade = idadeNova;
        estudantes.notas = notasNova;
    }
}