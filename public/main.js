// Variables a Usar
let coloresBoton = ['red', 'blue', 'green', 'yellow'];

let eleccionUsuario = [];
let eleccionMaquina = [];

let entrada = false;
let level = 0;

const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';

const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) || [];

//Documento

$(document).keydown(function () {
	if (!entrada) {
		$('#level-title').text('Nivel ' + level);
		gamePattern();
		entrada = true;
	}
});

//Juego

$('.btn').click(function () {
	let colorUsuario = $(this).attr('id');
	eleccionUsuario.push(colorUsuario);

	makeSound(colorUsuario);
	animatePress(colorUsuario);

	checkAnswer(eleccionUsuario.length - 1);
});

$(document).keydown(function (event) {
	for (let i = 0; i < 4; i++) {
		if (event.key.toUpperCase() == $('#' + coloresBoton[i]).text()) {
			let colorUsuario = coloresBoton[i];
			eleccionUsuario.push(colorUsuario);

			makeSound(colorUsuario);
			animatePress(colorUsuario);

			checkAnswer(eleccionUsuario.length - 1);
		}
	}
});

function gamePattern() {
	eleccionUsuario = [];

	level++;
	$('#level-title').text(`Nivel ${level}`);

	let randomNumber = Math.floor(Math.random() * 4);

	let colorAleatorio = coloresBoton[randomNumber];

	eleccionMaquina.push(colorAleatorio);
	makeSound(colorAleatorio);

	$('#' + colorAleatorio)
		.fadeOut(100)
		.fadeIn(100);
}

function checkAnswer(nivel) {
	if (eleccionMaquina[nivel] === eleccionUsuario[nivel]) {
		if (eleccionUsuario.length === eleccionMaquina.length) {
			setTimeout(function () {
				gamePattern();
			}, 1000);
		}
	} else {
		makeSound('wrong');
		$('body').addClass('game-over');
		$('#level-title').text('Game Over, Pulsa Una Tecla Para Reiniciar');

		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);

		checkHighScore(level);
		startOver();
	}
}

function startOver() {
	level = 0;
	eleccionMaquina = [];
	entrada = false;
}

//Funciones Animacion
function makeSound(nombre) {
	let seleccionMaquina = new Audio('sounds/' + nombre + '.mp3');
	seleccionMaquina.play();
}

function animatePress(color) {
	$('#' + color).addClass('pressed');
	setTimeout(function () {
		$('#' + color).removeClass('pressed');
	}, 100);
}

// HighScore Board

function checkHighScore(score) {
	const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];
	const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

	if (score > lowestScore) {
		saveHighScore(score, highScores); // TODO
		showHighScores(); // TODO
	}
}

function saveHighScore(score, highScores) {
	const name = prompt('Escribe tu nombre para agregar tu puntuación');
	const newScore = { score, name };

	// 1. Add to list
	highScores.push(newScore);

	// 2. Sort the list
	highScores.sort((a, b) => b.score - a.score);

	// 3. Select new list
	highScores.splice(NO_OF_HIGH_SCORES);

	// 4. Save to local storage
	localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScores() {
	const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];

	for (let i = 0; i < highScores.length; i++) {
		nombre = highScores[i]['name'];
		score = highScores[i]['score'];
		$('<tr><td>' + nombre + '</td><td>' + score + '</td</tr>').appendTo(
			'#names'
		);
	}
}

function clearStorage() {
	window.localStorage.clear();
}
