// Importa a interfacce readline para capturar entradas do usuário via terminal
import { rl } from "../../readlineInterface.js"; 

// Importa as funções que manipulam os estudantes (CRUD e array principal)
import { cadastroEstudantes, mostrarEstudantes, mostrarEstudantePorId,atualizarEstudante, deletarEstudante, estudantes } from "../model/studentsFunctions.js"; 

//Importa funções de cálculo de édias
import { mediaIndividual, calcularMediaTurma } from "./Caculo.js";

// Importa funções de relatórios (situação escolar por aluno e por turma)
import { situacaoEscolarIndividual, situacaoEscolarTurma } from "./Relatorios.js";

// Exibe o menu principal ccom as opções disponíveis
export const menuEstudante = () =>{ 
    console.log('\n=== BEM-VINDO ==='); 
    console.log('O que você deseja:');
    console.log('1 - Cadastrar um novo estudante');   
    console.log('2 - Mostrar todos os estudantes');
    console.log('3 - Mostrar um estudante');
    console.log('4 - Atualizar estudante');
    console.log('5 - Remover estudante');
    console.log('6 - Relatórios de Estudante');
    console.log('7-  Relatórios da Turma');
    console.log('8 - Média individual');
    console.log('9 - Média da turma e Top3 melhores médias')
    console.log('10 - Sair\n');
    interMenu(); // Chama o submenu que captura a escolha do usuário
};

// Captura a escolha do usuário e redireciona para a função correspondente.
export const interMenu = () => { 
    rl.question('Escolha uma opção:', answer =>{ 
        switch(answer){ 
            case '1': 
            questionStudents(); //Cadastro de estudante
            break;

            case '2':
                mostrarEstudantes();
                break;

            case '3':
                digitandoId(mostrarEstudantePorId); // Buscar por ID
                break;

            case '4':
                digitandoId((id)=>{
                    menuEditarDados(id); //Atualizar dados
                });
                break;

            case '5':
                digitandoId(deletarEstudante); // Deleta estudante pelo ID
                break;

            case '6':
                digitandoId(situacaoEscolarIndividual);
                break;
             
            case '7':
                situacaoEscolarTurma();
                break;
            
            case '8': 
                digitandoId(mediaIndividual);
                break;
                
                
            case '9':
                calcularMediaTurma();
                break;
            
            case '10':
                console.log('Saindo do programa...')
                console.log('\n Volte Sempre :)')
                 rl.close(); // Fecha o programa
                break;

            default:
                console.log('Opção inválida!');
                menuEstudante(); // Retorna ao menu
        } 
        
    }

)};

// Perggunta ao usuário os dados de um novo estudante e cadastra
const questionStudents = () =>{
    rl.question('\nDigite o nome do estudante: ', nome =>{
            
        rl.question('Digite a idade do estudante: ', idadeStr =>{
                const idade = Number(idadeStr)

            rl.question('Digite as notas do estudante mediante aos 4 semestres: ', notasStr =>{
                const notas = notasStr.split(',').map(n => Number(n.trim()));

                   rl.question('Digite o email do estudante:', email =>{

                    // Cadastra o estudante
                    cadastroEstudantes(nome, idade, notas, email);
                    
                    // Pergunta se deseja cadastrar outro
                    rl.question('Deseja cadastrar outro estudante? (s/n): ', answer =>{
                        if( answer === 's'){
                            questionStudents(); //Recursão -> chama de novo para cadastrar outro

                        }else if(answer === 'n'){
                            console.log(`Processo executado com sucesso!`);

                            // Mostra o último estudante cadastro
                            const ultimoEstudante = estudantes[estudantes.length -1]
                            console.log(`id: ${ultimoEstudante.id} | Estudante: ${ultimoEstudante.nome} | idade: ${ultimoEstudante.idade}  | email:${ultimoEstudante.email} cadastrado com sucesso`)

                            desejaContinuar();
                    };
                    });
                });
            });
        });    
    });
};


// Pergunta se o usuário quer continuar ou encerrar o programa
export const desejaContinuar = () =>{
    return new Promise((resolve) => {
            rl.question('Deseja continuar? (s/n) ', answer =>{
        const resp = answer.toLocaleLowerCase();

        if(resp === 's' || resp === 'S'){ //Caso o usuário coloque S ou N o programa continuar a execução
            console.log('\nVoltando para o menu...');
            menuEstudante();
            resolve(true);

        }else if( resp == 'n' || resp == 'N'){
            console.log('\nVolte sempre: :)')
            rl.close();
            resolve(false);

        }else{
            console.log('Digite novamente a opção que deseja você:');    
            resolve(desejaContinuar()); // Recursão para validar entrada
            }

        }
    )});
};



// Captura o ID digitado e chama o callback ccorrespondente
export const digitandoId= (callback) =>{
    console.log('\n')

    rl.question('Digite o id do estudante: ', idString =>{

     const id = Number(idString);
     
     if(isNaN(id)){
        console.log("ID inválido! Digite apenas números.")
        return digitandoId(callback) // Reforça a entrada correta
     }
     callback(id);
    }

)};

// Mostra o menu de edição dos dados do estudante
export const menuEditarDados=(id) =>{
    console.log('\nO que você deseja editar?');
    console.log('1 - Nome');
    console.log('2 - Idade ');
    console.log('3 - Notas');
    console.log('4 - Email');
    editandoDados(id);
}

// Recebe a escolha e executa a atualização correspondente
  export const editandoDados = (id) =>{
    rl.question('Escolha uma opção:', opção =>{
    switch(opção){
        case '1':
            rl.question('Digite o nome:', nomeNovo =>{
                console.log('Nome atualizado com sucesso!');
                atualizarEstudante(id, nomeNovo);
            });
            break;
        case '2':
            rl.question('Digite a nova idade:',idadeString =>{
                const idadeNova = Number(idadeString);
                if(isNaN(idadeNova)){
                    console.log('Idade inválida');
                    return editandoDados();
                }
                atualizarEstudante(id, undefined, idadeNova);
                console.log('Idade atualizada com sucesso!')
            });
            break;
        case '3':
            rl.question("Digite as novas notas:",notasString =>{
                const notasNova = notasString.split(',').map(n => Number(n.trim()))
                atualizarEstudante(id, undefined, undefined, notasNova);
            });
            break;
        case '4':
            rl.question('Digite o novo email:', emailNovo =>{
                console.log('Email atualizado com sucesso!');
                atualizarEstudante(id, undefined, undefined, undefined, emailNovo);
            });
            break;

            default:
                console.log('Opção inválida!');
                editandoDados(id); // Reforça a entrafa válida
    }
   }
   );
};
