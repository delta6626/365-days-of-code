let colorBoxes = document.querySelectorAll(".colorBox");
let colorsArray = [
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
];
let lockColorButtons = document.querySelectorAll(".lockColor");
let colorValueTexts = document.querySelectorAll(".colorValue");

function initializeApp() {
  assignRandomColorToBoxes();
  renderColors();
  addEventListenersForButtons();
}

function assignRandomColorToBoxes() {
  colorsArray.forEach((item) => {
    if (item.locked == false) {
      item.color = getRandomHexColor();
    }
  });
}

function renderColors() {
  for (let i = 0; i < colorsArray.length; i++) {
    colorBoxes[i].style.backgroundColor = colorsArray[i].color;
    colorValueTexts[i].innerText = colorsArray[i].color;
  }
}

function getRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function addEventListenersForButtons() {
  for (let i = 0; i < lockColorButtons.length; i++) {
    lockColorButtons[i].addEventListener("click", () => {
      if (!colorsArray[i].locked) {
        lockIthColor(i);
        lockColorButtons[i].innerText = "Unlock";
        lockColorButtons[i].blur();
      } else if (colorsArray[i].locked) {
        unlockIthColor(i);
        lockColorButtons[i].innerText = "Lock";
        lockColorButtons[i].blur();
      }
      window.focus();
      console.log(colorsArray);
    });
  }
}

function lockIthColor(i) {
  colorsArray[i].locked = true;
}

function unlockIthColor(i) {
  colorsArray[i].locked = false;
}

window.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    assignRandomColorToBoxes();
    renderColors();
  }
});

window.addEventListener("load", initializeApp);
