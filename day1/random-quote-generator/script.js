const API_URL = "https://api.quotable.io/quotes/random";
let mainWrapper = document.querySelector(".mainWrapper");
let applyDarkTheme = document.querySelector(".applyDarkTheme");
let applyLightTheme = document.querySelector(".applyLightTheme");
let quoteText = document.querySelector(".quoteText");
let quoteAuthor = document.querySelector(".quoteAuthor");
let nextQuote = document.querySelector(".nextQuote");
let nextText = document.querySelector(".nextText");
let loaderIcon = document.querySelector(".loaderIcon");

function initializeApp() {
  lucide.createIcons();
  loadTheme();
  loadQuote();
}

function loadTheme() {
  let theme = localStorage.getItem("theme");
  if (theme == null) {
    theme = "light";
    localStorage.setItem("theme", theme);
    mainWrapper.classList.add(theme);
  } else {
    mainWrapper.classList.add(theme);
  }
}

function setContent(data) {
  quoteText.innerText = data[0].content;
  quoteAuthor.innerText = "- " + data[0].author;
}

function loadQuote() {
  fetch(API_URL)
    .then((response) => {
      response.json().then((data) => {
        setContent(data);
      });
    })
    .catch((err) => console.log(err));
}

function loadNextQuote() {
  nextQuote.setAttribute("disabled", "true");
  nextText.classList.add("hidden");
  loaderIcon.classList.remove("hidden");
  fetch(API_URL).then((response) => {
    response.json().then((data) => {
      setContent(data);
      loaderIcon.classList.add("hidden");
      nextText.classList.remove("hidden");
      nextQuote.removeAttribute("disabled");
    });
  });
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "light") {
    mainWrapper.classList.remove("light");
    mainWrapper.classList.add("dark");
    localStorage.setItem("theme", "dark");
    applyLightTheme.classList.remove("hidden");
    applyDarkTheme.classList.add("hidden");
  } else if (currentTheme == "dark") {
    mainWrapper.classList.remove("dark");
    mainWrapper.classList.add("light");
    localStorage.setItem("theme", "light");
    applyDarkTheme.classList.remove("hidden");
    applyLightTheme.classList.add("hidden");
  }
}

applyDarkTheme.addEventListener("click", toggleTheme);

applyLightTheme.addEventListener("click", toggleTheme);

nextQuote.addEventListener("click", loadNextQuote);

window.addEventListener("load", initializeApp);
