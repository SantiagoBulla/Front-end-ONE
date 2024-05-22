import { mensajes, tiposError } from "./customErros.js";
import esUnCuil from "./validarCuil.js";
import esMayorDeEdad from "./validarEdad.js";

const campoDeFormulario = document.querySelectorAll('[required]'); // obtener los campos del formulario
const formulario = document.querySelector('[data-formulario]'); // capturamos el formulario

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const listaDatos = {
        // e.target hace referencia al elemento del formulario que desencadenó el evento (en este caso, el formulario completo).
        // elements, es una colección de todos los elementos del formulario 
        nombre: e.target.elements['nombre'].value,
        email: e.target.elements['email'].value,
        identificacion: e.target.elements['identificacion'].value,
        cuil: e.target.elements['cuil'].value,
        fecha_nacimiento: e.target.elements['fecha_nacimiento'].value,
    }

    // se almacena los datos en el localStorage
    localStorage.setItem('registro', JSON.stringify(listaDatos));

    // se redirecciona al siguiente formulario
    window.location.href = './abrir-cuenta-form-2.html';
})

campoDeFormulario.forEach(campo => { // recorre la lista de elementos y agrega un evento cuando el elemento pierde el foco
    campo.addEventListener('blur', () => verificarCampo(campo)); // al reconocer el evento se llama la funcion verificar campo
    campo.addEventListener('invalid', evento => evento.preventDefault()); // evita que mande un mensaje de validacion por defecto
});

function verificarCampo(campo) {

    let mensaje = ''; // se declara la variable que almacenara el error
    campo.setCustomValidity('');

    if (campo.name == 'cuil' && campo.value.length >= 11) {
        esUnCuil(campo)
    }

    if (campo.name == 'fecha_nacimiento' && campo.value != '') {
        esMayorDeEdad(campo);
    }

    // se recorren el array con los tipos de errores y por cada error se valida el campo
    tiposError.forEach(error => {
        // se accede a la propiedad 'error' del objeto validity
        // ! se usa [] cuando la propiedad puede ser un valor dianmico de modo que se evita la notacion de punto
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error]; // capturamos el error y lo asignamos a la variable mensaje
        }
    });

    // creamos una referencia al span mas cercano del campo que arrojo
    const mensajeError = campo.parentNode.querySelector('.mensaje-error');

    const validarInputCheck = campo.checkValidity(); // se valida el input checkbox

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = '';
    }

}