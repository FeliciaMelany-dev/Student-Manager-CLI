import path from "path";
import fs from "fs";
import { desejaContinuar } from "./Interacao.js";

//Caminho absoluto do arquivo onde ficam os estudantes atualizados
const filePathNovo = path.resolve('data/estudantes_atualizados.json');

/*Função para carregar os estudantes do arquivo JSON atualizado.
* Se não conseguir ler o arquivo, retorna um array vazio */
const carregarEstudantes = () =>{
    try{
        const data = fs.readFileSync(filePathNovo, 'utf-8'); // Lê o conteúdo do array
        return JSON.parse(data) // Converte de texto JSON para array de objeto
    }catch (err){
        console.log('Erro ao ler o arquivo de estudantes:', err);
        return[];
    }
};

// Função para calcular a média individual de um estudante (soma todas e divide pela quantidade)
export const calcularMediaIndividual = (estudante) =>{
    return estudante.notas.reduce((a, b) => a +b, 0)/ estudante.notas.length
}
/**Motra a média de um estudante específico pelo seu ID.
 * Caso o ID não seja encontrado, exibe mensagem de erro
 */
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
};

/**Calcula a média geral da turma.
 * Soma as médias de todos os alunos e divide pela quantidade de alunos
 * Também chama a função que lista os Top 3 melhores estudantes.
 */

export const calcularMediaTurma = async   () =>{
    let estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado');
        return;
    };

    //Soma todas as édias individuais 

    const somaMedia = estudantes_atualizados.reduce((total, estudante) => {
        const somaEst = estudante.notas.reduce((soma, n) => soma + n, 0);
        const mediaEst = somaEst/ estudante.notas.length;
        return total + mediaEst;
    }, 0)
    const mediaTurma = somaMedia / estudantes_atualizados.length;

    console.log(`Média geral da turma é: ${mediaTurma.toFixed(2)}`);

    // Mostra o ranking dos 3 melhores alunos
    listarTop3Alunos();

    await desejaContinuar();
    
    return mediaTurma;

};

/**Lista os 3 melhores alunos da turma com base nas médias
 * Caso haja empate, mostra mais 3.
 */
const listarTop3Alunos= () =>{
    let estudantes_atualizados = carregarEstudantes();

    if(estudantes_atualizados.length === 0){
        console.log('Nenhum estudante encontrado');
        return;
     };
     // Cria um novo array com cada estudante + sua édia calculada
    const estudantesComMedia = estudantes_atualizados.map(est =>({
        ...est,
        media:calcularMediaIndividual(est)
    }));

    // Ordena os alunos pela média (do maior para o menor)
    estudantesComMedia.sort((a, b)=> b.media -a.media);

    const top3 = [];
    let rank = 1;

// Percorre a lista até pegar os 3 primeiros (ou mais, caso de empate)

    for(let i = 0; i <estudantesComMedia.length && top3.length <3; i++){
        let atual = estudantesComMedia[i];

        // Garante que se houver empate na última posição, todos sejam incluídos
         if(top3.length < 3 || atual.media === top3[top3.length -1]. media){
            top3.push(atual);
         }else if(top3.length < 3){
            break;
         };
    };
    //Exibe os resultados
    console.log('\n===Top 3 melhores alunos ===');
    top3.forEach((est, index) => {
        console.log(`${index + 1} - ${est.nome} (ID: ${est.id}) - Média: ${est.media.toFixed(2)}`)
    }
)};

