let valores = [8, 1, 7, 4, 2, 9]
console.log(valores[0])

//a posição começa no 0
//enquanto ele não chegar no elemnto final do vetor
//ele vai adicionar +1 a posição
for(let pos = 0; pos < valores.length; pos++) {
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`)
}
console.log(' ')
//mostra a posição e mostra o valor que esta na posição especifica
//como ele muda a posição (pos++), ele lê o valor de outra posição


//como ler: para cada posição dentro de valores, mostre o valor dos elementos
for(let pos in valores) {
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`)
}