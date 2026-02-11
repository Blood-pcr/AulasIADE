let userId = 1;

async function carregarUtilizador(id) {
    const loading = document.getElementById('loading');
    const card = document.getElementById('card');
    const error = document.getElementById('error');
    const btn = document.getElementById('btnProximo');

    loading.style.display = 'block';
    card.style.display = 'none';
    error.style.display = 'none';
    btn.disabled = true;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error('Utilizador não encontrado');
        }

        const carregarUtilizador = await response.json();

        // Atualizar o conteúdo
        document.getElementById('nome').textContent = carregarUtilizador.name;
        document.getElementById('email').textContent = carregarUtilizador.email;
        document.getElementById('cidade').textContent = carregarUtilizador.address.city;
        
        // Exibir o cartão
        loading.style.display = 'none';
        card.style.display = 'block';
        btn.disabled = false;


        //Bloco de erro para simular falha na requisição
    } catch (err) {
        loading.style.display = 'none';
        error.textContent = 'Erro ao carregar utilizador. Reiniciando...';
        error.style.display = 'block';
        btn.disabled = false;
        
        setTimeout(() => {
            userId = 1;
            carregarUtilizador(userId);
        }, 2000);
    }
}
//iniciar o proximo utilizador
function carregarProximo() {
    userId++;
    carregarUtilizador(userId);
}

carregarUtilizador(userId);
