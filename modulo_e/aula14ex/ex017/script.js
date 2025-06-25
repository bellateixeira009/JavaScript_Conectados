function gerar() {
    var num = document.getElementById('txtnum')
    var tab = document.getElementById('seltab')

    //se o campo de entrada estiver vazio, mostra uma mensagem pedindo pro usuário digitar um número
    if (num.value.length == ''){
        window.alert('Por favor, digite um número!!')
    } else {
        var n = Number(num.value) //transforma o valor em número
        var c = 1 // faz a tabuada começar do 1
        tab.innerHTML = '' //se o usuário pedir pra gerar outra tabuada, limpa a tabuada anterior pra mostrar somente a nova gerada

        //enquanto o multiplicador for até 10, ele cria um elemento filho do select(<option>) que é guardado na var item
        while (c <= 10) { 
            var item = document.createElement('option') 

            item.text = `${n} x ${c} = ${n*c}` //cria a multiplicação (frase que vai estar na linha)
            tab.appendChild(item) //coloca a linha dentro da lista
            c++ //soma +1 ao multiplicador 
        }

    }
}