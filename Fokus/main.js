const html = document.querySelector('html');
const btnCorto = document.querySelector('.app__card-button--corto');
const btnEnfoque = document.querySelector('.app__card-button--enfoque');
const btnLargo = document.querySelector('.app__card-button--largo');
const bannerImagen = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const inciarCuentaRegresiva = new Audio('./sonidos/play.wav');
const pausarCuentaRegresiva = new Audio('./sonidos/pause.mp3');
const finCuentaRegresiva = new Audio('./sonidos/beep.mp3');
const btnIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iniciarPausarIcono = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.getElementById('timer');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

btnCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    btnCorto.classList.add('active');
});

btnLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    btnLargo.classList.add('active');
});

btnEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    btnEnfoque.classList.add('active');
});

function cambiarContexto(contexto) {

    mostrarTiempo();

    botones.forEach((item) => {
        item.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    bannerImagen.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Que tal tomar una respiro?<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        finCuentaRegresiva.play();
        alert('Tiempo finalizado')
        reiniciar()
        return
    }
    textoIniciarPausar.textContent = 'Pausar';
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
}

// Cada vez que se haga click se va a llamar la funcion iniciarPausar
btnIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) { // valida si el identificador del intervalo es nula
        iniciarPausarIcono.setAttribute('src', './imagenes/play_arrow.png');
        pausarCuentaRegresiva.play();
        reiniciar();
        return
    }
    // establece un intervalo de un segundo de espera, llamando la funcion cuentaRegresiva
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    iniciarPausarIcono.setAttribute('src', './imagenes/pause.png');
    inciarCuentaRegresiva.play();
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent = 'Comenzar';
}

function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000); // El obj Date genera una fecha para poder usarla en js
    // se indica el formato de como queremos ver la fecha establecida (region,{formato de min, formato de seg})
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', { minute: '2-digit', second: "2-digit" });
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();