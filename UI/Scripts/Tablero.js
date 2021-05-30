let tablero = document.getElementById("tablero");
let mas2Jugadores = false;

$(document).ready(function() {
    cargarTablero(mas2Jugadores);
});

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


    for (let g = 0; g < 14; g++) {
        let celda = document.getElementById("c" + gemasArray[g].cellNumber);
        celda.className += "gema" + gemasArray[g].gema;
        celda.innerHTML = "gema";
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
        celda.innerHTML = "power-up";
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