
export const estudantes = []; // Lista de estudantes

export const cadastroEstudantes = (nome, idade,notas) => { // Arrow Function, função para cadastrar novo estudante.
        const novoEstudante = { 
        nome: nome,
        idade: idade,
        notas: notas
    }
    estudantes.push(novoEstudante) // Metódo para salvar o objeto estudante dentro do array estudantes.
    return  novoEstudante // Fazendo a várivale estudante sair do bloco da função
}
