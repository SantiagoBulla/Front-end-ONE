export default function esUnCuil(campo) {
    // indica que el metodo replace reemplazara en el campo por valores vacios cuando encuentre un - o una /
    const cuil = campo.value.replace(/[-\/]/g, '');
    if (tinenNumerosRepetidos(cuil)) {
        console.log('Valores repetidos');
        campo.setCustomValidity('Valores repeditos');
    } else {
        if (validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)) {
            console.log('cuil valido');
        } else {
            console.log('cuil no existe');
            campo.setCustomValidity('Cuil no existe');
        }
    }
}

function tinenNumerosRepetidos(cuil) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    // retorna true/false si el valor de cuil incluye o no alguna de las expresiones almacenadas dentro de numerosRepetidos
    return numerosRepetidos.includes(cuil)
}

function validarPrimerosDigitos(cuil) {
    // extrae los dos primeros caracteres dentro del cuil substr(inicio,fin-1)
    let primerosDigitos = cuil.substr(0, 2);
    let digitosValidos = ['20', '23', '24', '27', '30', '33', '34'];

    return digitosValidos.includes(primerosDigitos);
}

function validarDigitoVerificador(cuil) {
    let acumulado = 0;
    const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 10; i++) {
        // se multiplica los primeros digitos y el numero medio por los valores del array
        /*
            x y - numero de identificación - numero identificador
            20 - 12345678 - ?
            **   ********
            54 - 32765432 - ?
        */
        acumulado += parseInt(cuil[i], 10) * factores[i];
    }

    let ValidadorTeorico = 11 - (acumulado % 11); // se calcula 11 - el modulo del acumulado sobre el total de numeros (11)

    if (ValidadorTeorico == 11) {
        ValidadorTeorico = 0;
    } else if (ValidadorTeorico == 10) {
        ValidadorTeorico = 9;
    }

    const digitoVerificador = parseInt(cuil[10], 10);

    return digitoVerificador === ValidadorTeorico;
}