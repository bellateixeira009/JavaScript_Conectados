//cria a função parimp que recebe o parâmetro n, o num que voce quer testar
function parimp(n) {
    if (n % 2 == 0){ //verifica se o resto da divisão é par. Se dividir n por 2 e o resto for 0, o num é par
        return 'Par!'
    } else {
        return 'Ímpar!'
    }
}
console.log(parimp(4))