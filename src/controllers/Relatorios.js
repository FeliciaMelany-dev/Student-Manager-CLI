import path from "path";
import fs from "fs";
import { calcularMediaIndividual, mediaIndividual } from "./Caculo.js";
import {desejaContinuar} from "./Interacao.js";


const filePathNovo = path.resolve('data/estudantes_atualizados.json');

export const carregarEstudantes = () =>{
    try{
        const data = fs.readFileSync(filePathNovo, 'utf-8');
        return JSON.parse(data)
    }catch (err){
        console.log('Erro ao ler o arquivo de estudantes:', err);
        return[];
    }
};
 export const situacaoEscolarIndividual = (id) =>{
     const estudantes_atualizados = carregarEstudantes();
     const estudante = estudantes_atualizados.find(e => e.id === id);

     if(!estudante){
        console.log(`Estudante com ID ${id} não encontrado`);
        desejaContinuar();
        return;
     }

     const media = calcularMediaIndividual(estudante);

     if(media >= 7.0){
        
    console.log(`\n=== Relatório do Estudante ===`);
    console.log(`Nome: ${estudante.nome}`);
    console.log(`ID: ${estudante.id}`);
    console.log(`Notas: ${estudante.notas.join(', ')}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Status: Aprovado`);
    desejacontinuar();
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


 }
 )};

