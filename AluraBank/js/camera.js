// crear las referencias a los elementos html para inicar la camara
const botonAbrirCamara = document.querySelector('[data-video-boton]');
const camara = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');

// crear las referencias a los elementos html para capturar la foto
const botonCapturarFoto = document.querySelector('[data-tomar-foto]');
const mensaje = document.querySelector('[data-mensaje]');
const canvas = document.querySelector('[data-video-canvas]');

// boton enviar
const botonEnviar = document.querySelector('[data-enviar]');
let imgUrl = '';


// se usa async - await porque navigator tiene que esperar a que el usuario acepte y decida que camara usar
botonAbrirCamara.addEventListener('click', async () => {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

    // oculta la img boton que inicia la camara, muestra el video de la camara del usuario
    botonAbrirCamara.style.display = 'none';
    camara.style.display = 'block';
    video.srcObject = iniciarVideo;
});

botonCapturarFoto.addEventListener('click', () => {
    // Obtiene el contexto 2D del canvas y dibuja lo que captura el video
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    // Convierte el contenido del canvas a una URL de datos en formato JPEG
    imgUrl = canvas.toDataURL('image/jpeg');

    // Oculta el elemento de la cámara y muestra el elemento de mensaje
    camara.style.display = 'none';
    mensaje.style.display = 'block';
})

botonEnviar.addEventListener('click', () => {
    const recibirDatos = localStorage.getItem('registro');
    const convertirDatos = JSON.parse(recibirDatos);
    convertirDatos.img_url = imgUrl;
    localStorage.setItem('registro', JSON.stringify(convertirDatos));

    window.location.href = './abrir-cuenta-form-3.html';
});