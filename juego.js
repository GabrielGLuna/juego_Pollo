const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');
const resultado = document.querySelector('h2');
const record = document.getElementById('record');

let currentCasilla = 0; // Casilla actual del primer emoji
const emojiSize = 40;
let emojiY = currentCasilla + emojiSize; // Posición inicial del primer emoji
let emojiX = 50;
const casillaHeight = 112.5; // Altura de cada casilla

let recordMasAlto = 0;

let contadorPerro = 0;  // Nuevo contador para el perro
let contadorGusano = 0; // Nuevo contador para el gusano

let perroX = canvas.width - emojiSize; // Posición inicial del emoji de perro
let perroY = Math.floor(Math.random() * 4) * casillaHeight + emojiSize; // Posición vertical aleatoria en una de las casillas

let gusanoX = canvas.width - emojiSize; // Posición inicial del emoji de gusano
let gusanoY = Math.floor(Math.random() * 4) * casillaHeight + emojiSize; // Posición vertical aleatoria en una de las casillas

let movingRight = true; // Dirección del movimiento horizontal
let emojiSpeed = 5; // Velocidad del emoji en píxeles por fotograma
let gusanoSpeed = 3;

let contador = 0; // Contador de cruces entre el emoji de pollo y el gusano
let contadoraux = 0;
let recordAnterior = 0;

function setRandomPerroPosition() {
    perroX = canvas.width - emojiSize; // Posición inicial en el lado derecho del canvas
    perroY = Math.floor(Math.random() * 4) * casillaHeight + emojiSize; // Posición vertical aleatoria en una de las casillas
}

function setRandomGusanoPosition() {
    gusanoX = canvas.width - emojiSize; // Posición inicial en el lado derecho del canvas
    gusanoY = Math.floor(Math.random() * 4) * casillaHeight + emojiSize; // Posición vertical aleatoria en una de las casillas
}

function drawEmoji() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar primer emoji
    ctx.fillStyle = 'yellow';
    ctx.font = `${emojiSize}px Arial`;
    ctx.fillText('🐥', emojiX, emojiY);
}

function drawPerro() {
    // Dibujar emoji de perro
    ctx.fillStyle = 'brown';
    ctx.fillText('🐕', perroX, perroY);
}

function drawGusano() {
    // Dibujar emoji de gusano
    ctx.fillStyle = 'green';
    ctx.fillText('🦠', gusanoX, gusanoY);
}

function moveUp() {
    if (currentCasilla > 0) {
        emojiY -= casillaHeight;
        currentCasilla--;
    }
}

function moveDown() {
    if (currentCasilla < 3) {
        emojiY += casillaHeight;
        currentCasilla++;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        moveUp();
    } else if (event.code === 'ArrowDown') {
        moveDown();
    }
});

function checkCollision() {
    return (
        emojiX < gusanoX + emojiSize &&
        emojiX + emojiSize > gusanoX &&
        emojiY < gusanoY + emojiSize &&
        emojiY + emojiSize > gusanoY
    );
}

function checkCollisionPerro() {
    return (
        emojiX < perroX + emojiSize &&
        emojiX + emojiSize > perroX &&
        emojiY < perroY + emojiSize &&
        emojiY + emojiSize > perroY
    );
}

function gameLoop() {
    drawEmoji();
    drawPerro();
    drawGusano();

    if (contador >= 0 && contador < 5) {
        gusanoX -= gusanoSpeed;
        perroX -= emojiSpeed;
    } else if (contador >= 5 && contador < 10) {
        perroX -= emojiSpeed * 1.5;
        gusanoX -= gusanoSpeed * 1.5;
    } else if (contador >= 10 && contador < 15) {
        perroX -= emojiSpeed * 2;
        gusanoX -= gusanoSpeed * 2;
    } else if (contador >= 15 && contador < 20) {
        perroX -= emojiSpeed * 2.5;
        gusanoX -= gusanoSpeed * 2.5;
    } else if (contador >= 20 && contador < 25) {
        perroX -= emojiSpeed * 3;
        gusanoX -= gusanoSpeed * 3;
    } else if (contador >= 25) {
        perroX -= emojiSpeed * 4;
        gusanoX -= gusanoSpeed * 3;
    }

    if (perroX < 1) {
        setRandomPerroPosition();
    }

    if (checkCollisionPerro()) {
        setRandomPerroPosition();
        resultado.innerHTML = "PERDISTE";
       
        if (contadorPerro > recordMasAlto) {
            recordMasAlto = contadorPerro;
            record.innerHTML = "Nuevo Record: " + contadorPerro + " | Record Mas Alto: " + recordMasAlto;
        } else {
            record.innerHTML = "Ultimo Record: " + contadorPerro + " | Record Mas Alto: " + recordMasAlto;
        }
        contadorPerro = 0;  // Reiniciar solo el contador del perro
        contador =0;
        
    }

    
    if (gusanoX < 1) {
        setRandomGusanoPosition();
        resultado.innerHTML = "PERDISTE";
        record.innerHTML = "Ultimo Record: " + contadorGusano + " | Record Mas Alto: " + recordMasAlto;

        if (contadorGusano > recordMasAlto) {
            recordMasAlto = contadorGusano;
            record.innerHTML = "Nuevo Record: " + contadorGusano + " | Record Mas Alto: " + recordMasAlto;
        }

        contadorGusano = 0;  // Reiniciar solo el contador del gusano
        contador = 0;
    }

    


    if (checkCollision()) {
        contador++;
        contadorPerro++;
        contadorGusano;
        setRandomGusanoPosition();

        if (contador > recordMasAlto) {
            recordMasAlto = contador;
        }
    }

    resultado.innerHTML = contador;
    requestAnimationFrame(gameLoop);
}

// ... (tu código anterior)

setRandomPerroPosition();
setRandomGusanoPosition();
gameLoop();