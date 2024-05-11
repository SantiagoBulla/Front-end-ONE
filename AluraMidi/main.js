// funcion que reproduce un sonido de una etiqueta de audio de html
function playSonido(idElementoAudio) {
    document.querySelector(idElementoAudio).play();
}

// Almacena la lista de teclas
const listaDeTeclas = document.querySelectorAll('.tecla');

// recorre la lista de teclas y asigna funcionalidades a cada una
for (let contador = 0; contador < listaDeTeclas.length; contador++) {
    // crea una referencia a tecla que se interactua y el sonido que debe reproducir
    const tecla = listaDeTeclas[contador]
    const instrumento = tecla.classList[1];
    // Genera el selector dinamico
    const idAudio = `#sonido_${instrumento}`;
    // Asigna al evento onclick una funcion anonima que llama la funcion playSonido
    tecla.onclick = function () {
        playSonido(idAudio);
    };
    // Permite activar el resalte de color rojo cuando se trabaja con eventos de teclado
    tecla.onkeydown = function (e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            tecla.classList.add('activa');
        }
    }

    tecla.onkeyup = function () {
        tecla.classList.remove('activa');
    }
}