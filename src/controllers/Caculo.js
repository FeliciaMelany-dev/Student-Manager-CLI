import path from "path";
import fs from "fs";
import { desejaContinuar } from "./Interacao.js";

const filePathNovo = path.resolve('data/estudantes_atualizados.json');

const carregarEstudantes = () =>{
    try{
        const data = fs.readFileSync(filePathNovo, 'utf-8');
        return JSON.parse(data)
    }catch (err){
        console.log('Erro ao ler o arquivo de estudantes:', err);
        return[];
    }
};

export const calcularMediaIndividual = (estudante) =>{
    return estudante.notas.reduce((a, b) => a +b, 0)/ estudante.notas.length
}

export const mediaIndividual = (id) =>{
    let estudantes_atualizados = carregarEstudantes();
    const estudantesMdia = estudantes_atualizados.find(e=> e.id == id);
    if(!estudantesMdia){
        console.log(`Estudante com ID ${id} não encontrado`);
        desejaContinuar();
        return;
    }
    const media = calcularMediaIndividual(estudantesMdia)

    console.log(`Média de ${estudantesMdia.nome} (ID: ${id}): ${media.toFixed(2)}`);
    desejaContinuar();
    return media;
}


export const calcularMediaTurma = async   () =>{
    let estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado');
        return;
    }
    
    const somaMedia = estudantes_atualizados.reduce((total, estudante) => {
        const somaEst = estudante.notas.reduce((soma, n) => soma + n, 0);
        const mediaEst = somaEst/ estudante.notas.length;
        return total + mediaEst;
    }, 0)
    const mediaTurma = somaMedia / estudantes_atualizados.length;

    console.log(`Média geral da turma é: ${mediaTurma.toFixed(2)}`);

    listarTop3Alunos();

    await desejaContinuar();
    
    return mediaTurma;

};


const listarTop3Alunos= () =>{
    let estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado');
        return;
     }
    const estudantesComMedia = estudantes_atualizados.map(est =>({
        ...est,
        media:calcularMediaIndividual(est)
    }));
    estudantesComMedia.sort((a, b)=> b.media -a.media);

    const top3 = [];
    let rank = 1;

    for(let i = 0; i <estudantesComMedia.length && top3.length <3; i++){
        let atual = estudantesComMedia[i];
        
         if(top3.length < 3 || atual.media === top3[top3.length -1]. media){
            top3.push(atual);
         }else if(top3.length < 3){
            break;
         };
    };
    console.log('\n===Top 3 melhores alunos ===');
    top3.forEach((est, index) => {
        console.log(`${index + 1} - ${est.nome} (ID: ${est.id}) - Média: ${est.media.toFixed(2)}`)
    }
)};

