const inputTxt = document.querySelector(".inputText");
const addBtn = document.querySelector(".addButton");
const ticks = document.querySelectorAll(".tickContainer");
const inputTxtContainer = document.querySelector(".p1");
const crossBtns = document.querySelectorAll(".crossButton");
const task = document.querySelector(".task");
const taskContainer = document.querySelector(".taskContainer");

let count = 0;

// Add a click event listener to the add button
addBtn.addEventListener("click", () => {
  if (inputTxt.value.trim() !== "") {
    console.log(inputTxt.value);
    count++;
    console.log(count);
    addTask(inputTxt.value);
    inputTxt.value = ""; // Clear the input field
  } else {
    console.log("Input is empty!");
  }
});
function addTask(task1) {
  let divcloned = copyDiv(task);
  divcloned.classList.remove("hidden");
  divcloned.classList.remove("task");
  divcloned.classList.add("task" + count);
  ptag = divcloned.querySelector("p");
  ptag.classList.remove("p1");
  ptag.classList.add("p1" + count);
  ptag.textContent = task1;
}

function copyDiv(div) {
  let clonedDiv = div.cloneNode(true);
  div.insertAdjacentElement("afterend", clonedDiv);
  return clonedDiv;
}
