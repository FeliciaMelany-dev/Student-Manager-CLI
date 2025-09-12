import { rl } from "../../readlineInterface.js"; //importanto função readline para usar no meu arquivo index.js
import { cadastroEstudantes, mostrarEstudantes, mostrarEstudantePorId,atualizarEstudante, deletarEstudante, estudantes } from "../model/studentsFunctions.js"; //importanto array de estudantes

export const menuEstudante = () =>{ 
    console.log('\n=== BEM-VINDO ==='); 
    console.log('O que você deseja:');
    console.log('1 - Cadastrar um novo estudante');
    console.log('2 - Mostrar todos os estudantes');
    console.log('3 - Mostrar um estudante');
    console.log('4 - Atualizar estudante');
    console.log('5 - Remover estudante');
    console.log('6 - Sair\n');
    interMenu();
}
export const interMenu = () => { 
    rl.question('Escolha uma opção:', answer =>{ 
        switch(answer){ 
            case '1': 
            questionStudents(); 
            break;

            case '2':
                mostrarEstudantes();
                break;

            case '3':
                digitandoId();
                break;

            case '4':
                atualizarEstudante();
                break;

            case '5':
                deletarEstudante();
                break;
            case '6':
                console.log('Saindo do programa')
                 rl.close();
                break;
            default:
                console.log('Opção inválida!');
                menuEstudante();
        } 
        
    }

)};

const questionStudents = () =>{
    rl.question('\nDigite o nome do estudante: ', nome =>{
            
        rl.question('Digite a idade do estudante: ', idadeStr =>{
                const idade = Number(idadeStr)

            rl.question('Digite as notas do estudante mediante aos 4 semestres: ', notasStr =>{
                const notas = notasStr.split(',').map(n => Number(n.trim()));

                cadastroEstudantes(nome, idade, notas);
            
                rl.question('Deseja cadastrar outro estudante? (s/n): ', answer =>{
                    if( answer === 's'){
                        questionStudents();
                    }else if(answer === 'n'){
                        console.log(`Processo executado com sucesso!`);
                        const ultimoEstudante = estudantes[estudantes.length -1]
                        console.log(`id: ${ultimoEstudante.id} Estudante: ${ultimoEstudante.nome} idade: ${ultimoEstudante.idade} cadastrado com sucesso`)

                        dejesacontinuar();
                    }

                });
            });
        });    
    });
};



export const dejesacontinuar = () =>{
    rl.question('Deseja continuar? (s/n) ', answer =>{
        const resp = answer.toLocaleLowerCase();
        if(resp === 's'){
            console.log('\nVoltando para o menu\n');
            menuEstudante();
        }else if( resp == 'n'){
            console.log('Volte sempre: :)')
            rl.close();
        }else{
            console.log('Digite novamente a opção que deseja você:');    
            dejesacontinuar();
            }

        }
    )};





export const digitandoId= () =>{
    console.log('\n')
    rl.question('Digite o id do estudante: ', idString =>{
     const id = Number(idString);
        mostrarEstudantePorId(id);
        rl.close();
    }
)};