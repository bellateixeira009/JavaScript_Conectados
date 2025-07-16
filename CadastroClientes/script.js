// ==========================
// LOCALSTORAGE
// ==========================

// convertendo os dados dos clientes em str e salvando no localStorage
function setDB(data) {
    localStorage.setItem("clientesSalvos", JSON.stringify(data));
}

// convertendo os dados para o formato original array
function getDB() {
    return JSON.parse(localStorage.getItem("clientesSalvos")) || [];
}

// ==========================
// RENDERIZAR
// ==========================

function renderTable(clientes = getDB()) { // pega o array de clientes
    const tbody = document.getElementById('tabela-clientes-tbody');

    tbody.innerHTML = ''; // limpa a tabela antes de renderizar de novo

    // para cada cliente cria uma linha de tabela
    clientes.forEach((cliente, i) => {
        const tr = document.createElement('tr');

        // dentro de cada linha adiciona uma célula
        // essas células são adicionadas à linha (<tr>) usando tr.appendChild(td), já que cada <td> é um filho direto da <tr>

        const tdNome = document.createElement('td');
        tdNome.textContent = `${cliente.nome} ${cliente.sobrenome}`;
        tr.appendChild(tdNome);

        const tdCelular = document.createElement('td');
        tdCelular.textContent = cliente.celular;
        tr.appendChild(tdCelular);

        const tdEndereco = document.createElement('td');
        tdEndereco.textContent = `${cliente.logradouro}, ${cliente.numero} - ${cliente.bairro}, ${cliente.cidade} - ${cliente.uf}`;
        tr.appendChild(tdEndereco);

        // criando célula para ações de excluir e editar
        const tdAcoes = document.createElement('td');

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'excluir';
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirCliente(i);

        const btnEditar = document.createElement('button');
        btnEditar.className = 'editar';
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarCliente(i);

        tdAcoes.appendChild(btnExcluir);
        tdAcoes.appendChild(btnEditar);
        tr.appendChild(tdAcoes);

        // a linha completa (<tr>) é adicionada ao corpo da tabela (<tbody>), que é o lugar onde as linhas aparecem na tela.
        tbody.appendChild(tr);
    });
}

// ==========================
// EXCLUIR & EDITAR
// ==========================

function excluirCliente(i) {
    const clientes = getDB(); // pega todos os clientes salvos
    clientes.splice(i, 1); // remove o cliente a partir da sua posição
    setDB(clientes); // salva a nova lista no localStorage
    renderTable();
}

let clienteEditando = null; // controla se está editando um cliente

function editarCliente(i) {
    const clientes = getDB();
    const cliente = clientes[i]; // seleciona o cliente que vai ser editado
    update(cliente, i); // preenche o formulário com os dados do cliente
}

function update(cliente, i) {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('sobrenome').value = cliente.sobrenome;
    document.getElementById('celular').value = cliente.celular;
    document.getElementById('cep').value = cliente.cep;
    document.getElementById('logradouro').value = cliente.logradouro;
    document.getElementById('numero').value = cliente.numero;
    document.getElementById('bairro').value = cliente.bairro;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('uf').value = cliente.uf;

    clienteEditando = i; // armazena o índice para atualizar depois
}

// ==========================
// FORMULÁRIO
// ==========================
// o que é executado quando clica em salvar:
document.getElementById('form-cliente').addEventListener('submit', function (e) {
    e.preventDefault();

    // cria um objeto cliente com os dados preenchidos pelo usuário no formulário
    const cliente = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        celular: document.getElementById('celular').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value
    };

    const clientes = getDB(); // pega todos os clientes salvos

    // pega nome e sobrenome separados e tira espaços antes ou depois 
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();

    // Valida nome e sobrenome com apenasLetras
    // se não for, mostra um toast de erro e interrompe o cadastro com return
    if (!apenasLetras(nome)) {
        mostrarToast('Nome inválido! Use apenas letras e espaços.', 'erro');
        return;
    }

    if (!apenasLetras(sobrenome)) {
        mostrarToast('Sobrenome inválido! Use apenas letras e espaços.', 'erro');
        return;
    }

    // se estiver editando, atualiza. Se não, adiciona novo:

    // atualiza os dados no índice correspondente
    if (clienteEditando !== null) {
        clientes[clienteEditando] = cliente;
        clienteEditando = null;
    } else {
        // add novo cliente
        clientes.push(cliente);
    }

    setDB(clientes);
    mostrarToast("Cliente salvo com sucesso!", "sucesso");
    renderTable();
    this.reset(); // limpa o formulário
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
    clienteEditando = null;
});

function apenasLetras(texto) {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(texto);
}

// ==========================
// MÁSCARAS
// ==========================

const cepInput = document.getElementById("cep");
const celularInput = document.getElementById("celular");

cepInput.addEventListener("input", () => {
    cepInput.value = cepInput.value
        .replace(/\D/g, "")     // remove tudo que não é número
        .replace(/^(\d{5})(\d{0,3})/, "$1-$2");     // coloca hífen após os 5 primeiros
});

celularInput.addEventListener("input", () => {
    celularInput.value = celularInput.value
        .replace(/\D/g, "") // remove tudo que não é número
        .replace(/^(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3") // parênteses nos dois primeiros dígitos, espaço após o DDD, traço antes dos últimos 4
        .replace(/-$/, ""); // remove traço se incompleto
});


// ==========================
// FILTRO POR NOME
// ==========================

document.getElementById('filtro-nome').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const clientes = getDB();

    const filtrados = clientes.filter(cliente => {
        const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`.toLowerCase();
        return nomeCompleto.includes(termo);
    });

    renderTable(filtrados);
});


// ==========================
// TOAST
// ==========================

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



window.onload = () => renderTable();
