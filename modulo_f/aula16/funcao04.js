function fatorial(n) {
    let fat = 1 //cria uma variavel que começa com 1
    for(let c = n; c > 1; c--){
    //enquanto c é maior que 1, continua repetindo
    //diminui c em 1
        fat *= c //fat = fat * c
    }
    return fat
}
console.log(fatorial(5))

/* fat = 1

fat *= 5 --> 5
fat *= 4 --> 20
fat *= 3 --> 60
fat *= 2 --> 120
- acaba o loop pq c = 1
*/