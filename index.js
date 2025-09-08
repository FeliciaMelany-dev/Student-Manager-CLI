import { rl } from "./readlineInterface.js"; //importanto função readline para usar no meu arquivo index.js
import { cadastroEstudantes, estudantes } from "./studentRegistration.js"; //importanto array de estudantes


const questionStudents = () =>{
    rl.question('Digite o nome do estudante: ', nome =>{
            
        rl.question('Digite a idade do estudante: ', idadeStr =>{
                const idade = Number(idadeStr)

            rl.question('Digite as notas do estudante mediante aos 4 semestres: ', notasStr =>{
                const notas = notasStr.split(',').map(n => Number(n.trim()));

                cadastroEstudantes(nome, idade, notas);
                console.log(estudantes);
            
                rl.question('Deseja cadastrar outro estudante? (s/n): ', answer =>{
                    if( answer === 's'){
                        console.log('-----------------------------------------------------')
                        questionStudents();
                    };
                    rl.close()
                });
            });
        });
    });
};
questionStudents();

