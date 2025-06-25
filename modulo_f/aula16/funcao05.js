//recursividade é quando uma funçãi chama ela mesma 

function fatorial(n) {
    if (n ==1) { // se n for igual a 1, retorna 1 (1! = 1)
        return 1
    } else {
        return n * fatorial(n - 1) //se não chama a função de novo mas com n - 1
    }
}

console.log(fatorial(5))