var currentPath = window.location.pathname;
if (currentPath.includes("newGame")) {
  window.location.pathname = "/tui";
}
var pages = document.getElementById(currentPath).className = "nav-link active";