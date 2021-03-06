//import
//let canvas = document.getElementById("table-container");
//let ctx = canvas.getContext('2d');
let tablero = document.getElementById("tablero");
let mas2Jugadores = false;
let imagenDado = document.getElementById("imagen-dado");
let botonDado = document.getElementById("boton-dado");

let celdaActual;

$(document).ready(function() {
    cargarTablero(mas2Jugadores);
    imagenDado.style.backgroundImage = 'url(Imagenes/CarasDado/Cara1.png)';
    juego();
});

botonDado.addEventListener('click', function() {
    dado();
});

//CARGA DIFERENTES PERSONAJES
function cargarPersonaje(tipo) {
    let urlImagenPersonaje;
    switch (tipo) {
        case 1:
            //Arquero
            urlImagenPersonaje = 'url(Imagenes/Characters/ArqueroFront.png)';
        case 2:
            //Espadachín
            urlImagenPersonaje = 'url(Imagenes/Characters/EspadachinFront.png)';
            break;
        case 3:
            //Bersequer
            urlImagenPersonaje = 'url(Imagenes/Characters/BersequerFront.png)';
            break;
        case 4:
            //Mago
            urlImagenPersonaje = 'url(Imagenes/Characters/MagoFront.png)';
            break;
        case 5:
            //Asesino
            urlImagenPersonaje = 'url(Imagenes/Characters/AsesinoFront.png)';
            break;
        case 6:
            //Jinete
            urlImagenPersonaje = 'url(Imagenes/Characters/JineteFront.png)';
            break;
        case 7:
            //Espía
            urlImagenPersonaje = 'url(Imagenes/Characters/EspiaFront.png)';
            break;
    }

    return urlImagenPersonaje;
}

function dado() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let urlDado;
    switch (randomNumber) {
        case 1:
            urlDado = 'url(Imagenes/CarasDado/Cara1.png)';
            break;
        case 2:
            urlDado = 'url(Imagenes/CarasDado/Cara2.png)';
            break;
        case 3:
            urlDado = 'url(Imagenes/CarasDado/Cara3.png)';
            break;
        case 4:
            urlDado = 'url(Imagenes/CarasDado/Cara4.png)';
            break;
        case 5:
            urlDado = 'url(Imagenes/CarasDado/Cara5.png)';
            break;
        case 6:
            urlDado = 'url(Imagenes/CarasDado/Cara6.png)';
            break;
    }
    imagenDado.style.backgroundImage = urlDado;
}

//CARGAR EL TABLERO DINÁMICAMENTE
function cargarTablero(mas2Jugadores) {
    //CREACION DE LAS CELDAS 
    //FILAS
    for (let i = 1; i <= 10; i++) {
        let fila = document.createElement("tr");
        fila.id = "fila" + i;
        fila.className = "fila";

        let sumatoriaCeldas = 1;
        if (i > 1) {
            sumatoriaCeldas = (10 * (i - 1)) + 1;
        }
        //CELDAS DE CADA FILA
        for (let c = sumatoriaCeldas; c <= 10 * i; c++) {
            let celda = document.createElement("td");
            celda.id = "c" + c;
            if (c == 10) {
                celda.style.backgroundSize = "50px 50px";
                celda.style.backgroundImage = 'url(Imagenes/castle.png)';
            } else if (c == 91) {
                celda.style.backgroundSize = "50px 50px";
                celda.style.backgroundImage = 'url(Imagenes/castle.png)';
            }

            celda.addEventListener('click', function() {
                //console.log(document.getElementById(celdaActual));
                if (celda.id != "c10" && celda.id != "c91") {
                    if (document.getElementById(celdaActual) !== null) {
                        document.getElementById(celdaActual).style.backgroundImage = '';
                    }
                    let randomCharacter = Math.floor(Math.random() * 7) + 1;
                    celda.style.backgroundImage = cargarPersonaje(randomCharacter);
                    celdaActual = celda.id;
                }
            });

            //celda.className = "celda";
            //$(celda).css('background-image', 'url(Imagenes/gray_texture.png)');

            fila.appendChild(celda);
        }
        tablero.appendChild(fila);
    }

    //CELDAS ALEATORIAS CON GEMAS
    let celdasEspecialesArray = [];
    let gemasArray = [];
    let powerUpsArray = [];


    for (let g = 0; g < 15; g++) {
        let randomGema = Math.floor(Math.random() * 3) + 1;
        let randomNumberCell = Math.floor(Math.random() * 100) + 1;
        //let casillaRepetida = false;

        while (verifyNumber(mas2Jugadores, celdasEspecialesArray, randomNumberCell)) {
            randomNumberCell = Math.floor(Math.random() * 100) + 1;
        }
        let random = { gema: randomGema, cellNumber: randomNumberCell };
        celdasEspecialesArray.push(randomNumberCell);
        gemasArray.push(random);
    }


    for (let g = 0; g < 15; g++) {
        let celda = document.getElementById("c" + gemasArray[g].cellNumber);
        celda.className += "gema" + gemasArray[g].gema;
        celda.innerHTML = "gema " + tipoGema(gemasArray[g].gema);
    }

    //ALEATORIZAR LAS TEXTURAS DE LAS CASILLAS CON POWER UPS
    //NUMEROS ALEATORIOS PARA POWER UPS
    for (let p = 15; p < 29;) {
        let randomowerUp = Math.floor(Math.random() * 4) + 1;
        let randomNumberCell = Math.floor(Math.random() * 100) + 1;

        if (verifyNumber(mas2Jugadores, celdasEspecialesArray, randomNumberCell) == false) {
            let random = { powerUp: randomowerUp, cellNumber: randomNumberCell };
            celdasEspecialesArray.push(randomNumberCell);
            powerUpsArray.push(random);
            p++;
        }

    }
    //POWER UPS
    /* POWER UP 1 ES MEJORA ATAQUE
    POWER UP 2 ES MEJORA EN DEFENSA 
    POWER UP 3 ES TRAMPA DE ATAQUE 
    POWER UP 4 ES TRAMPA DE DEFENSA
    */

    for (let p = 0; p < 14; p++) {
        let nombre = "#c" + powerUpsArray[p].cellNumber;
        $(nombre).css('background-image', 'url(Imagenes/green_texture.png)');
        let celda = document.getElementById("c" + powerUpsArray[p].cellNumber);
        celda.className = "power-up" + powerUpsArray[p].powerUp;
        celda.innerHTML = "power-up " + tipoPowerUp(powerUpsArray[p].powerUp);
    }
    /*
    console.log(gemasArray);
    console.log(powerUpsArray);
    */
}

//VERIFICA QUE EL NÚMERO ALEATORIO NO SE HAYA UTILIZADO
function verifyNumber(mas2Jugadores, celdasEspecialesArray, randomNumberCell) {
    let casillaRepetida = false;
    for (let casillasInvalidas = 0; casillasInvalidas < celdasEspecialesArray.length; casillasInvalidas++) {
        if (celdasEspecialesArray.length > 0) {
            if (mas2Jugadores == true) {

                if (randomNumberCell == celdasEspecialesArray[casillasInvalidas] || randomNumberCell == 91 || randomNumberCell == 10 || randomNumberCell == 1 || randomNumberCell == 100) {
                    casillaRepetida = true;
                }
            } else {
                if (randomNumberCell == celdasEspecialesArray[casillasInvalidas] || randomNumberCell == 91 || randomNumberCell == 10) {
                    casillaRepetida = true;

                }
            }
        }
    }
    return casillaRepetida;
}

//DEVUELVE EL TIPO DE GEMA 
function tipoGema(numero) {
    let tipo;
    switch (numero) {
        case 1:
            tipo = "verde";
            break;
        case 2:
            tipo = "azul";
            break;
        case 3:
            tipo = "blanca";
            break;
    }

    return tipo;
}

//DEVUELVE EL TIPO DE POWER UP
function tipoPowerUp(numero) {
    let tipo;
    switch (numero) {
        case 1:
            tipo = "aumento-ataque";
            break;
        case 2:
            tipo = "aumento-defensa";
            break;
        case 3:
            tipo = "trampa-ataque";
            break;
        case 4:
            tipo = "trampa-defensa"
    }

    return tipo;
}



//const trialCharacter = new Character(0, 0, 67.14, 67.14, 0, 0, 9, false);

/*
function drawCharacter(cellCol, cellRow) {
    var spriteWidth = 67.14;
    var spriteHeight = 67.14;
    //var col = 2;
    //var row = 3;
    var sourceX = spriteWidth * cellCol;
    var sourceY = spriteHeight * cellRow;
    ctx.drawImage(charactersSprite, sourceX, sourceY, spriteWidth, spriteHeight, cellCol * 80, cellRow * 60, spriteWidth, spriteHeight);

}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

class Character {
    constructor(x, y, width, height, frameX, frameY, speed, moving) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frameX = frameX;
        this.frameY = frameY;
        this.speed = speed;
        this.moving = moving;
    }
};



function animate(character) {
    drawSprite(charactersSprite, character.width * character.frameX, character.height * character.frameY, character.width, character.height, character.x, character.y, character.width, character.height);
}

function movePlayer(character) {
    character.y -= player.speed;
}

//SPRITE WIDTH: 470 HEIGHT: 562
const charactersSprite = new Image();
charactersSprite.src = "Imagenes/characters_sprite_sheet.png";

const trialCharacter = new Character(0, 0, 67.14, 70.25, 0, 0, 9, false);
*/