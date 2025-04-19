let contentWrapper = document.querySelector(".contentWrapper");
let textAreaWrapper = document.querySelector(".textAreaWrapper");
let markdownTextArea = document.querySelector(".markdownTextArea");
let previewer = document.querySelector(".previewer");
let increaseFontSizeButton = document.querySelector(".increaseFontSize");
let decreaseFontSizeButton = document.querySelector(".decreaseFontSize");
let toggleScreenButton = document.querySelector(".toggleScreen");
let copyHTMLButton = document.querySelector(".copyHTML");

let minimumFontSize = 16;
let maximumFontSize = 60;
let currentFontSize = 20;
let screenState = "half";

function renderContent(markdownString) {
  let htmlContent = marked.parse(markdownString);
  previewer.innerHTML = htmlContent;
}

function increaseFontSize() {
  if (currentFontSize < maximumFontSize) {
    currentFontSize++;
    contentWrapper.style.fontSize = currentFontSize + "px";
  }
}

function decreaseFontSize() {
  if (currentFontSize > minimumFontSize) {
    currentFontSize--;
    contentWrapper.style.fontSize = currentFontSize + "px";
  }
}

function resetCopyButtonToDefault() {
  setTimeout(() => {
    copyHTMLButton.innerText = "Copy HTML";
    copyHTMLButton.removeAttribute("disabled");
  }, 1000);
}

function handleToggleScreen() {
  if (screenState == "half") {
    textAreaWrapper.style.width = "0%";
    previewer.style.width = "100%";
    screenState = "full";
    toggleScreenButton.innerText = "Split view";
  } else if (screenState == "full") {
    textAreaWrapper.style.width = "50%";
    previewer.style.width = "50%";
    screenState = "half";
    toggleScreenButton.innerText = "Full screen";
  }
}

function copyHTMLToClipboard() {
  let htmlContent = previewer.innerHTML;
  navigator.clipboard.writeText(htmlContent).then(() => {
    copyHTMLButton.innerText = "Copied!";
    copyHTMLButton.setAttribute("disabled", "true");
    resetCopyButtonToDefault();
  });
}

markdownTextArea.addEventListener("input", (e) => {
  renderContent(e.target.value);
});

increaseFontSizeButton.addEventListener("click", increaseFontSize);
decreaseFontSizeButton.addEventListener("click", decreaseFontSize);
toggleScreenButton.addEventListener("click", handleToggleScreen);
copyHTMLButton.addEventListener("click", copyHTMLToClipboard);
