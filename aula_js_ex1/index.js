$(document).ready(function() {
    // Selecionar o botão
    const $botao = $('#btnDestacar');
    const $paragrafo = $('#texto');

    // Evento de clique no botão
    $botao.click(function() {
        // Adicionar a classe 'highlight' ao parágrafo
        $paragrafo.addClass('highlight');

        // Opcional: Mudar o texto do botão para indicar que o texto foi destacado
        $botao.text('Texto destacado!');

        // Desabilitar o botão após ser clicado
        $botao.prop('disabled', true);

        // Opcional: Após 3 segundos, remover o destaque e restaurar o botão
        setTimeout(function() {
            $paragrafo.removeClass('highlight');
            $botao.text('Destacar texto');
            $botao.prop('disabled', false);
        }, 3000);
    });
});
