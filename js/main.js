const panels = Array.from(document.querySelectorAll(".panel"));
const buttons = Array.from(document.querySelectorAll("[data-target]"));

function hasPanel(id) {
  return panels.some((panel) => panel.id === id);
}

function showPanel(id, historyMode = "replace") {
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === id);
  });

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.target === id));
  });

  if (location.hash !== `#${id}`) {
    if (historyMode === "push") {
      history.pushState(null, "", `#${id}`);
    } else if (historyMode === "replace") {
      history.replaceState(null, "", `#${id}`);
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.target, "push"));
});

window.addEventListener("popstate", () => {
  const current = location.hash.slice(1);
  showPanel(hasPanel(current) ? current : "about", "none");
});

const initial = location.hash.slice(1);
showPanel(hasPanel(initial) ? initial : "about");
