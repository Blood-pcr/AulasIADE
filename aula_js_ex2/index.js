$(document).ready(function() {
    
    const $bloco = $('#bloco');
    const $btnMostrar = $('#btnMostrar');
    const $btnEsconder = $('#btnEsconder');
    const $btnAlternar = $('#btnAlternar');

   
    $btnMostrar.click(function() {
        $bloco.show();
        console.log('Bloco mostrado com show()');
    });

   
    $btnEsconder.click(function() {
        $bloco.hide();
        console.log('Bloco escondido com hide()');
    });

    
    $btnAlternar.click(function() {
        $bloco.toggle();
        console.log('Bloco alternado com toggle()');
    });

    // Opcional: Versão com duração animada
    // Descomente as linhas abaixo para ver efeitos com animação

    /*
    $btnMostrar.click(function() {
        $bloco.show(500); // Mostra em 500ms
    });

    $btnEsconder.click(function() {
        $bloco.hide(500); // Esconde em 500ms
    });

    $btnAlternar.click(function() {
        $bloco.toggle(500); // Alterna em 500ms
    });
    */
});
