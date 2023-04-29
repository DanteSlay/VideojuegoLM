    let numObjetivos = 0;
    const board = document.getElementById("board");

    const boardWidth = 300;
    const boardHeight = 300;
    const cellWidth = 14;
    const cellHeight = 14;

// Calcular la cantidad de filas y columnas que caben en el contenedor
    const filas = Math.floor(boardHeight / cellHeight);
    const columnas = Math.floor(boardWidth / cellWidth);

    for (let i = 0; i < filas * columnas ; i++) {
        const nuevaCelda = document.createElement('div');
        nuevaCelda.setAttribute('id', 'target' + i);
        nuevaCelda.setAttribute('class', 'cell');
        nuevaCelda.setAttribute('onmousedown', 'disparar(' + i + ')');
        // nuevaCelda.addEventListener('click', disparar(i));

        board.appendChild(nuevaCelda);
        numObjetivos++
    }

    const NUMOBJETIVOS = numObjetivos;
    const OBJETIVOSXMIN = 60;
    const OBJETIVODEF = 0;
    const PUNTOS = 0;
    const ACIERTOPUNT = 5;
    const FALLOPUNT = 5;
    const BLANCO = true;
    const JUGADOR = '';

    const IDBLANCO = 'target';
    const CLASSACIERTO = 'hit';
    const CLASSFALLO = 'miss';
    const CLASSBLANCO = 'target';



    let juego = {
        objetivoPorMinuto: OBJETIVOSXMIN,
        objetivoCorrecto: OBJETIVODEF,
        puntos: PUNTOS,
        puntosAcierto: ACIERTOPUNT,
        blanco: BLANCO,
        jugador: JUGADOR,

    }

    const iniciar = () => {
        juego.objetivoCorrecto = OBJETIVODEF;
        juego.puntos = PUNTOS;
        juego.blanco = BLANCO;
    }


const crearBlanco = (id) => IDBLANCO + String(id);


    const diana = (anterior, nuevo) => {
        let idAnterior = crearBlanco(anterior);
        let idNuevo = crearBlanco(nuevo);

        for (let i = 0; i < NUMOBJETIVOS; i++) {
            let id = crearBlanco(i);
            document.getElementById(id).classList.remove(CLASSACIERTO);
            document.getElementById(id).classList.remove(CLASSFALLO);
        }



        juego.objetivoCorrecto = nuevo;

        juego.blanco = false;

        document.getElementById(idAnterior).classList.remove(CLASSBLANCO);

        document.getElementById(idNuevo).classList.add(CLASSBLANCO);
    }


    const nuevoBlanco = () => {

        let idBlanco = -1;

        while (idBlanco < 0 || idBlanco === juego.blanco) {
            idBlanco = Math.floor(Math.random() * NUMOBJETIVOS);
        }



        diana(juego.objetivoCorrecto, idBlanco);

    };





const acierto = (idNum) => {
    let id = crearBlanco(idNum);

    juego.blanco = true;
    juego.puntos += juego.puntosAcierto;

    console.log('Objetivo ' + id + ' acertado');

    document.getElementById(id).classList.add(CLASSACIERTO);
    document.getElementById(id).classList.remove(CLASSFALLO);

}

const fallo = (idNum) => {
    let id = crearBlanco(idNum);

    document.getElementById(id).classList.add(CLASSFALLO);
    document.getElementById(id).classList.remove(CLASSACIERTO);
}

const repetido = (numId) => {
    let id = crearBlanco(numId);
};

function disparar(id) {
    let dado;

    dado = id === juego.objetivoCorrecto;

    if (!juego.blanco && dado) {
        acierto(id);
        console.log('Le has dado');
    }else if (!dado) {
        fallo(id);
    } else {
        repetido(id);
    }
    document.getElementById("score").innerHTML = String(juego.puntos);

    return dado;
}

const form = document.getElementById("controlPanel")
form.onsubmit = (e) => {
    e.preventDefault();
    const jugador = document.getElementById("nameForm");
    const dificultad = document.getElementById("dificultad");

    const nombre = jugador.value;
    jugador.value = '';

    document.getElementById("name").innerText = nombre;

    iniciar();

    if (dificultad.value === "dificil") {
        juego.objetivoPorMinuto = 80;
    }else if (dificultad.value === "medio") {
        juego.objetivoPorMinuto = 65;
    } else {
        juego.objetivoPorMinuto = 50;
    }

    const tiempoEspera = Math.floor((60 * 1000) / juego.objetivoPorMinuto);
    let contador = 0;
    const interval = setInterval(() => {
        nuevoBlanco();
        contador += tiempoEspera;
        if (contador >= 30 * 1000) {
            clearInterval(interval);
        }
    }, tiempoEspera);

    document.getElementById(crearBlanco(juego.objetivoCorrecto)).classList.remove(CLASSBLANCO);


    const puntosTotal = juego.puntos;
    console.log(NUMOBJETIVOS);

};





