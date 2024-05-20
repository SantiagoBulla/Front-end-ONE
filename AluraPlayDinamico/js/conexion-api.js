async function obtenerVideos() {
    const conexion = await fetch('http://localhost:3000/videos');

    const conexionConvertida = conexion.json()

    return conexionConvertida;
};

async function insertarNuevoVideo(titulo, descripcion, url, imagen) {
    const conexion = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: { 'Content-type': 'aplication/json' },
        body: JSON.stringify({
            titulo: titulo,
            descripcion: `${descripcion} mil visualizaciones`,
            url: url,
            imagen: imagen
        })
    });

    const conexionConvertida = conexion.json();

    if (!conexion.ok) {
        throw new Error('Ha ocurrido un error al enviar el video');
    }

    return conexionConvertida;
}

async function buscarVideos(palabraClave) {
    const conexion = await fetch(`http://localhost:3000/videos`);
    const conexionConvertida = await conexion.json();

    const palabraClaveConvertida = palabraClave.toLowerCase();

    return conexionConvertida.filter(video => {
        const videoStringMinuscula = JSON.stringify(video).toLowerCase();

        return videoStringMinuscula.includes(palabraClaveConvertida);
    });
}

export const conexionAPI = {
    obtenerVideos,
    insertarNuevoVideo,
    buscarVideos
}

// obtenerVideos();