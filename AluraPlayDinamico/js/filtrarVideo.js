import { conexionAPI } from "./conexion-api.js";
import crearCard from "./mostrarVideos.js";

const parametroBusqueda = document.querySelector('[data-busqueda]');
const btn = document.querySelector('[data-btn-busqueda]');

async function filtrarVideo(evento) {
    evento.preventDefault();

    const busqueda = await conexionAPI.buscarVideos(parametroBusqueda.value);

    const lista = document.querySelector('[data-lista]');

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    busqueda.forEach(video => {
        lista.appendChild(crearCard(video.titulo, video.descripcion, video.url, video.imagen))
    });

    if (busqueda.length == 0) {
        lista.innerHTML = `<h2 class="mensaje__titulo">No fueron encontrados elementos para '${datosBusqueda}'</h2>`
    }
}

parametroBusqueda.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        filtrarVideo(e);
    }
})

btn.addEventListener('click', evento => filtrarVideo(evento));