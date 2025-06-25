//criando um vetor (array)
let num = [4, 3, 2, 1]

//adicionando um elemento ao vetor
//se eu quiser substituir um elemnto por outro, posso colocar ele em uma posição que ja esta ocupada
num[4] = 6

//adicionando um elemnto mas colocando ele na ultima posiçao do vetor
num.push(8)


//mostrando o vetor
console.log(`Nosso vetor é o ${num}`)

//mostrando ELEMENTO especifico do vetor
console.log(num[2])

//mostrando a POSIÇÃO que o elemnto está
console.log(num.indexOf(6))
//se pedir a posição de um elemnto que nao esta dentro do vetor, mostra -1 (O Js pesquisou esse elemnto dentro do vetor e nap achoi nenhuma correspondencia)
console.log(num.indexOf(12))

//fala quantos elemntos existe no vetor
console.log(num.length)

//coloca os elemntos em ordem crescente
console.log(num.sort())

//se for letras, ele coloca em ordem alfabética
var let = ['a', 'q', 'y', 'm', 'p', 'w', 'f']
console.log(let.sort())
