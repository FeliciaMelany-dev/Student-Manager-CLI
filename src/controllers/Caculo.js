import path from "path";
import fs from "fs";

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

export const mediaIndividual = (id) =>{
    let estudantes_atualizados = carregarEstudantes();
    estudantes_atualizados.find(e=> e.id == id);
    if(!estudantes_atualizados){
        console.log(`Estudante com ID ${id} não encontrado`);
        return;
    }
    const media = estudantes_atualizados.notas.reduce((a, b) => a+b, 0)/ estudantes_atualizados.notas.length;

    console.log(`Média de ${estudantes_atualizados.nome} (ID: ${id}): ${media.toFixed(2)}`);
}


export const calcularMediaTurma =() =>{
    let estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado');
        return;
    }
    
    const mediaTurma = estudantes_atualizados.reduce((a, b) => {
        const somaEst = estudantes_atualizados.notas.reduce((a, n) => a + b, 0);
        const mediaEst = somaEst/ estudantes_atualizados.notas.length;
        return a + mediaEst;
    }, 0)/estudantes_atualizados.length;
    console.log(`Média geral da turma é: ${mediaTurma.toFixed(2)}`);
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
        media: mediaIndividual(est)
    }));
    estudantesComMedia.sort((a, b)=> b.media -a.media);

    const top3 = [];
    let rank = 1;

    for(let i = 0; i <estudantesComMedia.length && top3.length <3; i++){
        let atual = estudantesComMedia[i];
        
         if(top3.length < 3 || atual.media === top3[top3.length -1]. media){

         }
    }
}     

