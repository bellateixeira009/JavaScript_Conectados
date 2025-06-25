function contar() {
    //pegando os campos de entrada
    var i = document.getElementById('inicio');
    var f = document.getElementById('fim');
    var p = document.getElementById('passo');
    //pegando o elemento do resultado
    var res = document.getElementById('res');

    //convertendo o valores do usuario em número
    var inicio = Number(i.value);
    var fim = Number(f.value);
    var passo = Number(p.value);

    //se a contagem pular de uma quant menor ou igual a 0, substitui por 1
    if (passo <= 0) {
        passo = 1;
      }

      res.innerHTML = 'Contando:<br>'; //modifica o conteudo (Preparando contagem... ---> contando:)

      // se o inicio da contagem for menor que o fim (contagem crescente), 
      if (inicio <= fim) {
        //começa pelo numero que o usuario deu (inicio)
        //continua contando enquanto c for menor ou igual ao fim
        //pega o valor atual de c e soma o valor de passo a ele (c = c + passo)
        for (var c = inicio; c <= fim; c += passo) { 
          res.innerHTML += c + ' '; //adiciona o número da contagem e um espaço pros num nao ficarem grudados
          //ex: 1 2 3 (conteudo)--- faz ficar 1 2 3 4
        }
      } else {
        for (var c = inicio; c >= fim; c -= passo) {
          res.innerHTML += c + ' ';
        }
      }
    }