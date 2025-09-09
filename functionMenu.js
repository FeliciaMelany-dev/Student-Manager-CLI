import { rl } from "./readlineInterface.js"; //importanto função readline para usar no meu arquivo index.js
import { cadastroEstudantes, estudantes } from "./studentsFunctions.js"; //importanto array de estudantes
import { mostrarEstudante } from "./studentsFunctions.js";

const menuEstudante = () =>{ //Arrow Fuction de menu para interagi a partir do desejo do meu usuario.
    console.log('\n=== BEM-VINDO ==='); // Todos os console.log mostra para o meu usuario o meu menu via terminal
    console.log('O que você deseja:');
    console.log('1 - Cadastrar um novo estudante');
    console.log('2 - Mostrar todos os estudantes');
    console.log('3 - Mostrar um estudante');
    console.log('4 - Atualizar estudante');
    console.log('5 - Remover estudante');
    rl.question('Escolha uma opção:'), opcao =>{//usando rl para ocorrer a interacação do meu usuário com o menu via terminal
        switch(opcao){ // usando a estrutura de condção switch case para realizar as operações a partir do desejo do usuario
            case '1':
                console.log(cadastroEstudantes())// caso o usuario digite '1' retorno para ele a função de cadastro de estudante.
                menuEstudante(); // apos terminar, vai retornar o menu novamente onde tem a opção de sair caso o usuario tenha terminado
                break; /// para parar a interação acabar assim que o usuario digitar a opção correta e nao mostrar as outras opções
            case '2':

                console.log()
        }
    }

}
menuEstudante();
