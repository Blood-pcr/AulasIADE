// Extensão para o Day.js
dayjs.extend(window.dayjs_plugin_relativeTime);

// Configurar o idioma para português
dayjs.locale('pt');

const entradaTarefa = document.getElementById('entradaTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const listarTarefas = document.getElementById('listarTarefas');
const estadoVazio = document.getElementById('estadoVazio');
const contadorTarefas = document.getElementById('contadorTarefas');

let tarefas = [];
// Função para carregar o utilizador
window.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
    apresentarTarefas();
    iniciarOrdenacao();
    actualizarContador();
    iniciarActualizadorTempo();
});

entradaTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

botaoAdicionar.addEventListener('click', adicionarTarefa);

// Funções para gerir as tarefas
function adicionarTarefa() {
    const texto = entradaTarefa.value.trim();
    
    if (texto === '') {
        entradaTarefa.focus();// Evitar adicionar tarefas vazias
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false,
        criadaEm: new Date().toISOString()
    };

    // Adicionar a nova tarefa à lista, guardar e apresentar
    tarefas.push(novaTarefa);
    guardarTarefas();
    apresentarTarefas();
    actualizarContador();

    entradaTarefa.value = '';
    entradaTarefa.focus();
}

// Funções para apresentar, alternar e apagar tarefas
function apresentarTarefas() {
    listarTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        estadoVazio.classList.add('mostrar');
        return;
    }

    estadoVazio.classList.remove('mostrar');

    // Ordenar tarefas por data de criação (mais recentes primeiro)
    tarefas.forEach(tarefa => {
        const li = criarElementoTarefa(tarefa);
        listarTarefas.appendChild(li);
    });
}
// Função para criar o elemento HTML de uma tarefa
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.className = `item-tarefa ${tarefa.concluida ? 'concluida' : ''}`;
    li.dataset.id = tarefa.id;

    const tempoAtras = dayjs(tarefa.criadaEm).fromNow();

    // Escapar o texto para evitar injeção de HTML
    li.innerHTML = `
        <div class="caixa-tarefa" onclick="alternarTarefa(${tarefa.id})"></div>
        <div class="conteudo-tarefa">
            <div class="texto-tarefa">${escaparHtml(tarefa.texto)}</div>
            <div class="tempo-tarefa">${tempoAtras}</div>
        </div>
        <div class="accoes-tarefa">
            <div class="pega-arrastar">⋮⋮</div>
            <button class="botao-apagar" onclick="apagarTarefa(${tarefa.id})">Apagar</button>
        </div>
    `;

    return li;
}
// Função para escapar texto e evitar injeção de HTML
function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
// Funções para alternar o estado de conclusão e apagar tarefas
function alternarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        guardarTarefas();
        apresentarTarefas();
    }
}
// Função para apagar uma tarefa
function apagarTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    guardarTarefas();
    apresentarTarefas();
    actualizarContador();
}

function guardarTarefas() {
    localStorage.setItem('tarefas_app', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas_app');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
}
// Função para actualizar o contador de tarefas
function actualizarContador() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    
    if (total === 0) {
        contadorTarefas.textContent = '0 tarefas';
    } else if (total === 1) {
        contadorTarefas.textContent = concluidas === 1 ? '1 tarefa completa' : '1 tarefa';
    } else {
        contadorTarefas.textContent = `${total} tarefas${concluidas > 0 ? ` (${concluidas} completa${concluidas > 1 ? 's' : ''})` : ''}`;
    }
}
// Função para iniciar a ordenação drag-and-drop
function iniciarOrdenacao() {
    new Sortable(listarTarefas, {// Sortable.js
        animation: 150,
        handle: '.pega-arrastar',
        ghostClass: 'arrastando',
        onEnd: function(evt) {
            const tarefaMoved = tarefas.splice(evt.oldIndex, 1)[0];// Remover índice antigo
            tarefas.splice(evt.newIndex, 0, tarefaMoved);// Inserir a tarefa no índice
            guardarTarefas();
        }
    });
}

// Função para actualizar o tempo de criação das tarefas a cada minuto
function iniciarActualizadorTempo() {
    setInterval(() => {
        const elementosTempo = document.querySelectorAll('.tempo-tarefa');
        tarefas.forEach((tarefa, indice) => {
            if (elementosTempo[indice]) {
                const tempoAtras = dayjs(tarefa.criadaEm).fromNow();
                elementosTempo[indice].textContent = tempoAtras;
            }
        });
    }, 60000);
}
// Expor as funções
window.alternarTarefa = alternarTarefa;
window.apagarTarefa = apagarTarefa;