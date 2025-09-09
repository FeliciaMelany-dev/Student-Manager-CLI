
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


export const mostrarEstudante = (id = null) =>{ // Arrow fuction para mostrar todos os estudantes ou apenas o estudante cdo respectivo id
     const encontrandoId = estudantes.find(estudante => estudante.id === id)
    if(!id == null){
      console.log(encontrandoId);
    }else if(encontrandoId){
        console.log('Id não encontrado')

    }else{
        console.log(estudantes);
    }
    
}
mostrarEstudante();
