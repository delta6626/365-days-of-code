let colorBoxes = document.querySelectorAll(".colorBox"); // Array of divs that display the color
let colorsArray = [
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
  { color: "", locked: false },
]; // Data structure for storing colors and their state.

let lockColorButtons = document.querySelectorAll(".lockColor"); // Array of button elements used to lock colors.
let colorValueTexts = document.querySelectorAll(".colorValue"); // Array of paraghraph elements that display the color's HEX code.

// Runs when the page is loaded
function initializeApp() {
  assignRandomColorToBoxes();
  renderColors();
  addEventListenersForButtons();
}

// Function to assign a randomly generated hex color to each element in the colorsArray;
function assignRandomColorToBoxes() {
  colorsArray.forEach((item) => {
    if (item.locked == false) {
      item.color = getRandomHexColor();
    }
  });
}

// Uses the colorsArray and sets the color for each element of colorBoxes
function renderColors() {
  for (let i = 0; i < colorsArray.length; i++) {
    colorBoxes[i].style.backgroundColor = colorsArray[i].color;
    colorValueTexts[i].innerText = colorsArray[i].color;
  }
}

// Function to generate a random hex color;
function getRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

// Function to register an event listener for each button in the lockColorButtons array
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

// Sets the locked attribute of a particular element in the colorsArray to true
function lockIthColor(i) {
  colorsArray[i].locked = true;
}

// Sets the locked attribute of a particular element in the colorsArray to false
function unlockIthColor(i) {
  colorsArray[i].locked = false;
}

window.addEventListener("keydown", (event) => {
  // Check if the user has clicked space bar. If so, generate colors.
  if (event.code == "Space") {
    assignRandomColorToBoxes();
    renderColors();
  }
});

// Initialize the app on page load
window.addEventListener("load", initializeApp);
