// Variables a Usar
let coloresBoton = ['red', 'blue', 'green', 'yellow'];

let eleccionUsuario = [];
let eleccionMaquina = [];

let entrada = false;
let level = 0;

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
	$('h1').text(`Nivel ${level}`);

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
