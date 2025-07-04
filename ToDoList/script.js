let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let filtroAtual = 'todas'; //é o filtro padrao q vai aparecer quando a pag atualizar

//função que guarda a lista de tarefas no localStorage e mantem elas msm que atualize a pagina
function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizar() {
  const ul = document.getElementById('lista');
  ul.innerHTML = '';

  //FILTROS
  let tarefasFiltradas = tarefas;
  //verifica se o filtro que você escolheu é pendentes. Se for, ela cria uma nova lista (tarefasFiltradas) que só tem as tarefas não concluídas.
  if (filtroAtual === 'pendentes') {
    tarefasFiltradas = tarefas.filter(t => !t.concluida); //!t.concluida quer dizer “pegue só as tarefas onde concluida é falso"
  } 
  
  //Se o filtro escolhido for concluidas ele pega só as tarefas que estão concluídas (t.concluida é verdadeiro).
//ent a lista tarefasFiltradas só vai ter essas tarefas.
  else if (filtroAtual === 'concluidas') {
    tarefasFiltradas = tarefas.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach((tarefa, i) => {
    const li = document.createElement('li'); //cria um novo elemento de lista <li> uma linha nova p mostrar uma tarefa.
    li.textContent = tarefa.texto; //colocamos dentro desse <li> o texto da tarefa que foi salva (o que a pessoa digitou antes)
    if (tarefa.concluida) li.classList.add('concluida'); //se a tarefa estiver marcada como concluída, adiciona uma classe chamada "concluida" para o <li>

    li.onclick = () => {
      const idx = tarefas.indexOf(tarefa);
      tarefas[idx].concluida = !tarefas[idx].concluida; 
      //aqui estamos trocando o valor da tarefa
      //! é o símbolo de "negação". Ent, ele inverte true pra false ou false pra true.

    //grava a nova lista no localStorage, para que continue lá mesmo se você atualizar a página
      salvar();
      renderizar();
    };

    //adiciona o botão de X ao lado de cada tarefa que permite que o usuário remova a tarefa ao clicar nele
    const span = document.createElement('span');
    span.textContent = '❌';
    span.onclick = (e) => {
      const idx = tarefas.indexOf(tarefa);
      tarefas.splice(idx, 1); // splice apaga 1 item a partir da posição idx.
      salvar();
      renderizar();
    };

    li.appendChild(span);
    ul.appendChild(li);
  });
}

function addTarefa() {
  const input = document.getElementById('inputTarefa');
  const texto = input.value.trim(); //trim() remove espaços do começo e do fim (ex: ' estudar ')
  if (!texto) return; //se o texto estiver vazio, a função não faz nada
  tarefas.push({ texto, concluida: false }); //adiciona a nova tarefa ao array tarefas.
  //concluida: false: por padrão, ela ainda não foi concluída
  salvar();
  renderizar();
  input.value = ''; //limpa o campo de texto depois de adicionar a tarefa
  input.focus();
}
//essa função recebe o filtro desejado: "todas", "pendentes" ou "concluidas".
//ela atualiza a variável filtroAtual com esse valor.
function filtrarTarefas(filtro) {
  filtroAtual = filtro;
  renderizar();
}

renderizar();
