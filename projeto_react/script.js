let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let filtroAtual = 'todos';

// ==========================
// SALVANDO NO LOCALSTORAGE
// ==========================
function salvar() {
  localStorage.setItem('alunos', JSON.stringify(alunos));
}

// ==========================
// ATUALIZANDO A LISTA
// ==========================
function renderizar() {
  const lista = document.getElementById('listaAlunos');
  lista.innerHTML = '';

  let alunosFiltrados = alunos;

  if (filtroAtual === 'aprovados') {
    alunosFiltrados = alunos.filter(a => a.nota >= 6);
  } else if (filtroAtual === 'reprovados') {
    alunosFiltrados = alunos.filter(a => a.nota < 6);
  }

  alunosFiltrados.forEach((aluno, index) => {
    const li = document.createElement('li');
    li.textContent = `${aluno.nome} - Nota: ${aluno.nota}`;
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.onclick = () => {
      alunos.splice(index, 1);
      salvar();
      renderizar();
    };

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });

  atualizarMedia();
}

// ==========================
// ADICIONANDO UM ALUNO
// ==========================

function adicionarAluno() {
  const nome = document.getElementById('nomeAluno').value.trim();
  const nota = parseFloat(document.getElementById('notaAluno').value);

  if (!nome || isNaN(nota) || nota < 0 || nota > 10) return;

  if (!apenasLetras(nome)) {
        mostrarToast('Nome inválido! Use apenas letras.', 'erro');
        return
      }

  alunos.push({ nome, nota });
  salvar();
  renderizar();

  document.getElementById('nomeAluno').value = '';
  document.getElementById('notaAluno').value = '';
  document.getElementById('nomeAluno').focus();
}

// ==========================
// NOME COM APENAS LETRAS
// ==========================

function apenasLetras(texto) {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(texto);
}

// ==========================
// NOTA MAXIMA 10
// ==========================
function validarNota(input) {
  let valor = parseFloat(input.value);

  if (isNaN(valor)) return;

  if (valor > 10) {
    input.value = ''; 
    mostrarToast('A nota máxima permitida é 10!', 'erro');
  }
}

// ==========================
// FILTROS
// ==========================
function filtrar(tipo) {
  filtroAtual = tipo;
  renderizar();
}



// ========================================
// .SOME(), .EVERY(), .FIND(), .FINDINDEX()
// ========================================

function verificarMaxima() {
  const algumMaximo = alunos.some(a => a.nota === 10);
  alert(algumMaximo ? 'Existe aluno com nota máxima!' : 'Nenhum aluno com nota máxima.');
}

function verificarTodosAprovados() {
  const todosAprovados = alunos.every(a => a.nota >= 6);
  alert(todosAprovados ? 'Todos os alunos estão aprovados!' : 'Nem todos estão aprovados.');
}

function buscarAluno(nome) {
  return alunos.find(a => a.nome.toLowerCase() === nome.toLowerCase());
}

function removerAluno(nome) {
  const index = alunos.findIndex(a => a.nome.toLowerCase() === nome.toLowerCase());
  if (index !== -1) {
    alunos.splice(index, 1);
    salvar();
    renderizar();
  }
}


// ========================================
// CÁLCULO DE MÉDIA GERAL DAS NOTAS
// ========================================
function atualizarMedia() {
  if (alunos.length === 0) {
    document.getElementById('mediaGeral').textContent = '';
    return;
  }

  const soma = alunos.reduce((acc, a) => acc + a.nota, 0);
  const media = (soma / alunos.length).toFixed(2);
  document.getElementById('mediaGeral').textContent = `Média geral: ${media}`;
}

function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return; // se container não existe, sai

    const toast = document.createElement('div');
    toast.classList.add('toast', tipo);
    toast.textContent = mensagem;

    container.appendChild(toast);

    // Depois de 3 segundos, remove o toast da tela
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
renderizar();
