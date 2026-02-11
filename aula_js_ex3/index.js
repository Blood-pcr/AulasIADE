$(document).ready(function() {
    // ====================================
    // 1. fadeOut() / fadeIn()
    // ====================================
    let estadoFade = true; // true = visível, false = invisível

    $('#btnFade').click(function() {
        const $elemento1 = $('#elemento1');

        if (estadoFade) {
            // Se está visível, desaparecer
            $elemento1.fadeOut(1000, function() {
                console.log('Elemento desapareceu com fadeOut()');
            });
            estadoFade = false;
        } else {
            // Se está invisível, reaparecer
            $elemento1.fadeIn(1000, function() {
                console.log('Elemento reapareceu com fadeIn()');
            });
            estadoFade = true;
        }
    });

    // ====================================
    // 2. slideToggle()
    // ====================================
    $('#btnSlide').click(function() {
        const $elemento2 = $('#elemento2');
        
        $elemento2.slideToggle(800, function() {
            console.log('slideToggle() aplicado');
        });
    });

    // ====================================
    // 3. fadeToggle()
    // ====================================
    $('#btnFadeToggle').click(function() {
        const $elemento3 = $('#elemento3');
        
        $elemento3.fadeToggle(800, function() {
            console.log('fadeToggle() aplicado');
        });
    });

    // ====================================
    // Informações adicionais (console)
    // ====================================
    console.log('Página de animações jQuery carregada!');
    console.log('Explore os botões para ver os efeitos:');
    console.log('- fadeOut() + fadeIn()');
    console.log('- slideToggle()');
    console.log('- fadeToggle()');
});

/*
    NOTAS SOBRE AS ANIMAÇÕES:
    
    fadeOut(duration, callback):
    - Torna o elemento invisível reduzindo sua opacidade
    - duration: tempo em ms (1000 = 1 segundo)
    - callback: função que executa após a animação terminar
    
    fadeIn(duration, callback):
    - Torna o elemento visível aumentando a opacidade
    - Mesmo uso de duration e callback
    
    slideToggle(duration, callback):
    - Alterna entre deslizar para cima (esconder) e para baixo (mostrar)
    - Alterna a altura do elemento
    - Bom para menus e painéis
    
    fadeToggle(duration, callback):
    - Alterna entre desaparecer e reaparecer
    - Combina fadeOut() e fadeIn()
    - Mais natural que hide/show
*/
