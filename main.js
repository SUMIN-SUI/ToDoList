const today = document.querySelector(".today");
const time = document.querySelector(".time");

function setClock() {
  const date = new Date();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + date.getMinutes();
  }
  today.innerHTML = `
    ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일
    `;
  time.innerHTML = `
    ${date.getHours()} : ${minutes}
    `;
}

window.onload = () => {
  setInterval(setClock, 1000);
};

let footerInput = document.querySelector(".footer_input");
const items = document.querySelector(".items");

function createItemRow(item) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item_row");
  itemRow.innerHTML = `
  <div class="item">
    <div>
        <input type="checkbox" id="item_name" onclick="checkList(this)" />
        <label for="item_name">${item}</label>
    </div>
    <button class="item_delete" onclick="deleteList(this)">
        <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  `;
  items.appendChild(itemRow);
  itemRow.scrollIntoView({ block: "center" });
  footerInput.value = "";
  footerInput.focus();
}

function list(event) {
  if (event.keyCode == 13) {
    if (!event.target.value) {
      return;
    }
    createItemRow(event.target.value);
  }
}

function checkList(checkbox) {
  const list = checkbox.parentElement.parentElement;
  const itemName = checkbox.nextElementSibling;
  if (itemName.style.textDecoration == "line-through") {
    itemName.style.textDecoration = "none";
    list.classList.remove("checked");
    return;
  }
  itemName.style.textDecoration = "line-through";
  list.classList.add("checked");
}

function deleteList(list) {
  const li = list.parentElement.parentElement;
  li.remove(li);
}

footerInput.addEventListener("keydown", list);

function addList() {
  if (footerInput.value === "") {
    footerInput.focus();
    return;
  }
  createItemRow(footerInput.value);
}
