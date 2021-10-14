document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");

  //adding squares to board
  for (var i = 0; i < 729; i++) {
    var div = document.createElement("div");

    board.appendChild(div);
  }

  const squares = document.querySelectorAll(".board div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  const leftBtn = document.querySelector(".left");

  const rightBtn = document.querySelector(".right");

  const upBtn = document.querySelector(".up");

  const downBtn = document.querySelector(".down");

  const width = 27;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.7;
  let intervalTime = 0;
  let interval = 0;

  //to start, and restart the game
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 850;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {
    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains("snake") //if snake goes into itself
    ) {
      alert("GAME OVER!!!\n\nRestart to try again");
      return clearInterval(interval); //this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop(); //removes last ite of the array and shows it
    squares[tail].classList.remove("snake"); //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

    //deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  //generate new apple once apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake")); //making sure apples dont appear on the snake
    squares[appleIndex].classList.add("apple");
  }

  startBtn.addEventListener("click", startGame);

  //controller
  leftBtn.addEventListener("click", () => {
    if (direction !== 1) {
      squares[currentIndex].classList.remove("snake");
      direction = -1;
    }
  });

  rightBtn.addEventListener("click", () => {
    if (direction !== -1) {
      squares[currentIndex].classList.remove("snake");
      direction = 1;
    }
  });

  upBtn.addEventListener("click", () => {
    if (direction !== width) {
      squares[currentIndex].classList.remove("snake");

      direction = -1 * width;
    }
  });

  downBtn.addEventListener("click", () => {
    if (direction !== -1 * width) {
      squares[currentIndex].classList.remove("snake");

      direction = width;
    }
  });
});
