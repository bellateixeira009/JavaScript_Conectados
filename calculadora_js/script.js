var entrada = '' //a entrada começa vazia mas ela vai guardar o que o usuario digita

function atualizarDisplay(texto) {
    document.getElementById('display').innerHTML = texto;
}

function inserir(num) { //(num) é a info que a função recebe. Se a função inserir('7'), o num será 7

    var operadores = ['+', '-', '/', '*']

    // se o ultimo caractere incluir um operador e o botao atual tambem, mostrar a mensgame erro
    if (operadores.includes(entrada[entrada.length - 1]) &&
        operadores.includes(num)
        
    ) {
        atualizarDisplay('Erro');
        entrada = '';
        return;
    }
    entrada += num //entradaAtual = entradaAnterior + num 
    //EX: usuario digita 1, ent entrada = '1'. Usuario digita 2, ent entrada = 1 + 2 ---- agr entrada vale 12
    atualizarDisplay(entrada);
}


function limpar() { //quando clica no botão C, chama a função limpar() que muda o conteúdo do display para uma string vazia, limpando.
    entrada = ''
    atualizarDisplay(entrada);
}


function apagar() { //quando clica no botão da seta, chama a função apagar()
    entrada = entrada.substring(0, entrada.length - 1) 
    //entrada é a variável que guarda o que o usuário digitou até agora.
    //a função substring() é usada para pegar uma parte de uma string.

    //EX: entrada = "123+4"
        //entrada.length = 5
        //entrada.substring(0, 4) // "123+"
        //OU: entrada.substring(0, entrada.length - 1 [5 -1])


    atualizarDisplay(entrada);
}


function calcular() {
    if (entrada) { //se a entrada não estiver vazia ela cria uma variavel chamada resultado que guarda o resultado da conta
        var resultado = eval(entrada) //eval() lê o conteudo de entrada como uma conta matemática
        if (resultado == Infinity) { // quando dividia por 0, aparecia Infinity no display, ent coloquei que se aparecer InfiniTy, ele mostra a mensgame erro no display
            atualizarDisplay('Erro');
            entrada = ''
        } else { //mas se nao der erro, atualiza a entrada para o resultado da conta
            entrada = resultado.toString()
            atualizarDisplay(entrada);
        }
    }
}


