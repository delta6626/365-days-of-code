// Convert HTML string to plain text

export function sanitizeHTML(htmlString) {
  const d = document.createElement("div");
  d.innerHTML = htmlString || "";
  return d.textContent || "";
}
