import { rl } from "../../readlineInterface.js"; //importanto função readline para usar no meu arquivo index.js
import { cadastroEstudantes, mostrarEstudantes, atualizarEstudante, deletarEstudante } from "../model/studentsFunctions.js"; //importanto array de estudantes

export const menuEstudante = () =>{ //Arrow Fuction para mostrar o menu para o meu usuário.
    console.log('\n=== BEM-VINDO ==='); // Todos os console.log serão mostrados para o meu usuario via terminal
    console.log('O que você deseja:');
    console.log('1 - Cadastrar um novo estudante');
    console.log('2 - Mostrar todos os estudantes');
    console.log('3 - Mostrar um estudante');
    console.log('4 - Atualizar estudante');
    console.log('5 - Remover estudante');    
}

export const interMenu = () => { //Função para interagi com meu usuario.
    rl.question('Escolha uma opção:', answer =>{ // executando readline para obter a resposta do meu usuario
        switch(answer){ // executando switch case para quando o usuario digitar uma opção, realizar a chamada da devida função.

            case '1': // 
            questionStudents(); //chama a função que interage com meu usuario pegando os dados e que chama a função de cadastro que salva o meu usuario no array.
            break;

            case '2':
                mostrarEstudantes();
                dejesacontinuar();
                break;

            case '3':
                mostrarEstudantes();
                dejesacontinuar();
                break;

            case '4':
                atualizarEstudante();
                dejesacontinuar();
                break;

            case '5':
                deletarEstudante();
                dejesacontinuar();
                break;
                rl.close();

        } 
        
    }

)};

const dejesacontinuar = () =>{
    rl.question('Deseja continuar? (s/n) ', answer =>{
        if(answer === 's'){
            return menuEstudante();
        }else if( answer == 'n'){
            console.log('Volte sempre: :)')
        }else{
            rl.question('Digite a opção que deseja: '), answer =>{      
                dejesacontinuar();
                rl.close(); 
            }

        }
    } 
)};




const questionStudents = () =>{
    rl.question('Digite o nome do estudante: ', nome =>{
            
        rl.question('Digite a idade do estudante: ', idadeStr =>{
                const idade = Number(idadeStr)

            rl.question('Digite as notas do estudante mediante aos 4 semestres: ', notasStr =>{
                const notas = notasStr.split(',').map(n => Number(n.trim()));

                cadastroEstudantes(nome, idade, notas);
            
                rl.question('Deseja cadastrar outro estudante? (s/n): ', answer =>{
                    if( answer === 's'){
                        questionStudents();
                    }else if(answer === 'n'){
                        
                    }
                    dejesacontinuar();
                    rl.close()
                    console.log(estudantes);
                });
            });
        });    
    });
};


