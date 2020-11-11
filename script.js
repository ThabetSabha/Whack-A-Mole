    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const timeUpDiv = document.querySelector(".time-up")
    let lastHole;
    let timeUp = false;
    let score = 0;


    function randomTime(min, max) {    //return a random value between min and max;
      return Math.round(Math.random() * (max - min) + min)
    }

    function randomHole(holes) {
      const holeIndex = Math.floor(Math.random() * holes.length);
      const selectedHole = holes[holeIndex];
      if (selectedHole === lastHole) {
        return randomHole(holes);
      }

      lastHole = selectedHole;
      return selectedHole;
    }

    function peep() {
      const time = randomTime(300, 1000);
      const hole = randomHole(holes);
      hole.classList.add('up');
      setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
      }, time);
    }

    function startGame() {
        score = 0;
      timeUp = false;
      timeUpDiv.textContent = ""
      scoreBoard.textContent = 0;
      peep();
      setTimeout(() => {
        timeUp = true;
        timeUpDiv.textContent = "Game Over!"
      }, 10000)

    }


    function bonk(e) {
      if (!e.isTrusted) {
        console.log("cheater");
        return;
      }
      this.parentNode.classList.remove("up");
      score++;
      scoreBoard.textContent = score;
    }
    moles.forEach(mole => mole.addEventListener('click', bonk), {once: true });
