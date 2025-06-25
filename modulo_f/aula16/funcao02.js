function soma(n1, n2) {
    return n1 + n2
}
console.log(soma(7, 3)) //os parâmetros n1 e n2 da função recebem 7 e 3 e sua soma da 10

console.log(soma(3)) //se eu definir só um parâmetro, ele me retorna NaN (Not a Number), pq o JS esperava um número mas nap conseguiu calcular


//mas se eu definir um valor padrão dentro do parâmetro ele consegue calcular
function soma2(n1=0, n2=0) {
    return n1 + n2
}

console.log(soma2(7))