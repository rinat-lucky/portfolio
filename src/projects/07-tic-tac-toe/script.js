const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerO');
const playboard = document.querySelector('.playboard');
const allBox = document.querySelectorAll('section span');
const players = document.querySelector('.players');
const resultBox = document.querySelector('.result-box');
const winText = resultBox.querySelector('.win-text');
const replayBtn = resultBox.querySelector('.btn');

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let playerSign = 'X';
let runBot = true;

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        // allBox[i].addEventListener('click', () => clickedBox(this));
    }

    selectXBtn.addEventListener('click', () => {
        selectBox.classList.add('hide'); // скрываем первый экран после выбора "фигур" X
        playboard.classList.add('show'); // показываем второй экран после выбора "фигур"
    });
    selectOBtn.addEventListener('click', () => {
        selectBox.classList.add('hide'); // скрываем первый экран после выбора "фигур" O
        playboard.classList.add('show'); // показываем второй экран после выбора "фигур"
		// players.setAttribute('class', 'players active player');
		players.classList.add('active', 'player'); // добавляем классы только на случай, если выбрана вторая сторона (О)
    });
});

// ход игрока 
function clickedBox(element) {
	if (players.classList.contains('player')) {
		element.innerHTML = `<i class='${playerOIcon}'></i>`; // добавляем иконку с фигурой О в клетку, на которую кликнул игрок
		players.classList.remove('active');
		playerSign = 'O';
		element.setAttribute('id', playerSign);
	} else {
		element.innerHTML = `<i class='${playerXIcon}'></i>`; // добавляем иконку с фигурой Х в клетку, на которую кликнул игрок
		players.classList.add('active');
		element.setAttribute('id', playerSign);
	}

	selectWinner(); // объявление победителя при наличии выигрышной комбинации
	playboard.style.pointerEvents = 'none'; // игрок не может сделать повторный ход до ответного хода бота
	element.style.pointerEvents = 'none'; // одна клетка не может быть выбрана повторно
	
	let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // случайное время для скорости ответа бота
	setTimeout(() => {
		bot(runBot); 
	}, randomDelayTime); // бот делает ответный ход через случайный промежуток времени
}

// ход бота
function bot() {
	if (runBot) {
		playerSign = 'O';
		let array = []; // создание массива для хранения неотмеченных клеток, которые может выбрать бот
		for (let i = 0; i < allBox.length; i++) {
			if (allBox[i].childElementCount == 0) { // если у клетки нет дочернего элемента (т.е. фигуры Х или О)
				array.push(i); // добавляем неотмеченные клетки в массив для бота
			}
		}
		let randomBox = array[Math.floor(Math.random() * array.length)]; // создаем случайную клетку (точнее индекс такой клетки) из числа неотмеченных, которую может выбрать бот

		if (array.length > 0) {
			if (players.classList.contains('player')) {
				allBox[randomBox].innerHTML = `<i class='${playerXIcon}'></i>`; // добавляем иконку с фигурой X в клетку, на которую кликнул игрок
				players.classList.add('active');
				playerSign = 'X';
				allBox[randomBox].setAttribute('id', playerSign);
			} else {
				allBox[randomBox].innerHTML = `<i class='${playerOIcon}'></i>`; // добавляем иконку с фигурой O в клетку, на которую кликнул игрок
				players.classList.remove('active');
				allBox[randomBox].setAttribute('id', playerSign);
			}
		}
		selectWinner();
		allBox[randomBox].style.pointerEvents = 'none'; // после хода бота на определенной клетке - эту клетку нельзя отмечать повторно ни одной из сторон
		playboard.style.pointerEvents = 'auto'; // игрок снова может сделать свой ход, в порядке очереди
		playerSign = 'X';
	}
}

// определение победителя игры
function getId(idname) {
	return document.querySelector('.box' + idname).id; // возвращение id (X/O)
}

function checkId(val1, val2, val3, sign) {
	if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
		return true;
	}
}

function selectWinner() { // перебираем выигрышные комбинации
	if (checkId(1, 2, 3, playerSign) || checkId(4, 5, 6, playerSign) || checkId(7, 8, 9, playerSign) || checkId(1, 4, 7, playerSign) || checkId(2, 5, 8, playerSign) || checkId(3, 6, 9, playerSign) || checkId(1, 5, 9, playerSign) || checkId(3, 5, 7, playerSign)) {
		runBot = false;
		bot(runBot);
		setTimeout(() => {
			playboard.classList.remove('show');
			resultBox.classList.add('show');
		}, 700);

		winText.innerHTML = `Игрок <p>${playerSign}</p> победил!`;
	} else {
		if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
			runBot = false;
			bot(runBot);
			setTimeout(() => {
				playboard.classList.remove('show');
				resultBox.classList.add('show');
			}, 700);

			winText.textContent = `Ничья!`;
		}
	}
}

replayBtn.addEventListener('click', () => window.location.reload());