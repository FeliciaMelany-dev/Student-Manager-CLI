import readline from 'readline'; //Importando ferramenta utilizada para fazer a conversasão entre o usuário e o programa via terminal.

export const rl = readline.createInterface({ // Interface para conversasão com o usuário via terminal.
    input: process.stdin, //input = entrada de dado pelo usuário(teclado)
    output: process.stdout // output = saida das informações pelo terminal
}) 