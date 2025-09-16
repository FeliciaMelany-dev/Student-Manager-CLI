// Importa módulo nativos do Node.js
import path from "path"; // Manipulação de caminhos de arquivos/diretórios
import fs from "fs"; // Leitura e escrita de arquivos

// Importa funções criadas em outros arquivos
import { calcularMediaIndividual} from "./Caculo.js";
import {desejaContinuar} from "./Interacao.js";

// Caminho absoluto do arquivo JSON onde ficam arazenados os dados dos estudantes
const filePathNovo = path.resolve('data/estudantes_atualizados.json');

/**
 * Carrega os estudantes do arquivo JSON.
 * @returns {Array} Retorna a lsita de estudantes cadastrados. Se ocorrer erro, retorna um array vazio
 */
export const carregarEstudantes = () =>{
    try{
        const data = fs.readFileSync(filePathNovo, 'utf-8'); // Lê o arquivo
        return JSON.parse(data) // Converte JSON em objetos JS
    }catch (err){
        console.log('Erro ao ler o arquivo de estudantes:', err);
        return[];
    }
};

/**
 * Mostra relatório de um único estudante, com base no ID informado
 * Indica se ele está Aprovado, em Recuperação ou Reprovado
 */
 export const situacaoEscolarIndividual = (id) =>{
     const estudantes_atualizados = carregarEstudantes(); // Carrega lista atualizada de estudantes
     const estudante = estudantes_atualizados.find(e => e.id === id); // Busca pelo ID

     if(!estudante){
        console.log(`Estudante com ID ${id} não encontrado`);
        desejaContinuar();
        return;
     }

     const media = calcularMediaIndividual(estudante); // Calcula a média do aluno

     if(media >= 7.0){
        
    // Impressão do relatório individual, com status baseado na média
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Aprovado`);
    desejaContinuar();

     }else if(media<6.9 && media>=5.0){
            
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Recuperação`);
    desejaContinuar();

     }else if(media<5){
            
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Reprovado`);
    desejaContinuar();
     }
 };
// Mostra rekatório completo de todos os estudantes da turma
// Exibe nome, notas, médias e situação escolar de cada estudante

 export const situacaoEscolarTurma = () =>{
    const estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado')
        desejaContinuar();
        return;
    }
    console.log("\n=== Relatório da Turma ===");

    estudantes_atualizados.forEach(estudante => {
        const media = calcularMediaIndividual(estudante);
        if(media >= 7.0){
        
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Aprovado`);

        console.log('\n');

     }else if(media<6.9 && media>=5.0){
            
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Recuperação`);
        console.log('\n');

     }else if(media<5){
            
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Reprovado`);
     }
     console.log('\n');
});
    desejaContinuar();
};


