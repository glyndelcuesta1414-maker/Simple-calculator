const display = document.getElementById("display");
let value = "";

function update() {
  display.textContent = value || "0";
}

function append(num) {
  if (num === "." && value.slice(-1) === ".") return;
  value += num;
  update();
}

function operator(op) {
  if (!value) return;
  if (/[+\-*/]$/.test(value)) {
    value = value.slice(0, -1); 
  }
  value += op;
  update();
}

function clearAll() {
  value = "";
  update();
}

function del() {
  value = value.slice(0, -1);
  update();
}

function equal() {
  try {
    // Evaluate safely, remove trailing operators
    if (/[+\-*/]$/.test(value)) {
      value = value.slice(0, -1);
    }
    value = eval(value).toString();
    update();
  } catch {
    display.textContent = "Error";
    value = "";
  }
}

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const num = btn.getAttribute("data-value");
    const act = btn.getAttribute("data-action");

    if (num) append(num);
    else if (act === "operator") operator(btn.textContent);
    else if (act === "clear") clearAll();
    else if (act === "delete") del();
    else if (act === "equals") equal();
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/^[0-9]$/.test(key)) append(key);
  else if (key === ".") append(".");
  else if (["+","-","*","/"].includes(key)) operator(key);
  else if (key === "Enter") equal();
  else if (key === "Backspace") del();
  else if (key.toLowerCase() === "c") clearAll();
  e.preventDefault();
});

update();
