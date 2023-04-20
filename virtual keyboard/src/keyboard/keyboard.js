import "./_keyboard.scss";
import * as buttons from "../buttons/buttons";

const renderKeyboard = () => {
  const textField = document.createElement("textarea");
  textField.classList.add("text-field");

  const keyboardButtons = buttons.russianKeyboardButtons;

  // функция для обработки нажатия на кнопки клавиатуры
  function handleKeyboardButtonClick(event) {
    const clickedButton = event.target;
    if (clickedButton.tagName === "BUTTON") {
      const buttonValue = clickedButton.textContent;
      if (buttonValue === "Backspace") {
        textField.value = textField.value.slice(0, -1);
      } else if (buttonValue === "Enter") {
        textField.value += "\n";
      } else if (buttonValue === "Space") {
        textField.value += " ";
      } else {
        textField.value += buttonValue;
      }
    }
  }

  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  keyboardButtons.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("keyboard__row");

    row.forEach((btn) => {
      const btnEl = document.createElement("button");
      btnEl.classList.add("keyboard__button", `keyboard__button--${btn.type}`);
      if (typeof btn === "string") {
        btn.split("").forEach((char) => {
          const charBtnEl = document.createElement("button");
          charBtnEl.classList.add("keyboard__button");
          charBtnEl.textContent = char;
          charBtnEl.addEventListener("click", handleKeyboardButtonClick);
          rowEl.appendChild(charBtnEl);
        });
      } else {
        btnEl.textContent = btn.key;
        btnEl.addEventListener("click", handleKeyboardButtonClick);
        rowEl.appendChild(btnEl);
      }
    });

    keyboard.appendChild(rowEl);
  });
  // функция для обработки нажатия на кнопки клавиатуры
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const keyboardButton = document.querySelector(
      `.keyboard__button[data-key="${key}"]`
    );
    if (keyboardButton) {
      keyboardButton.classList.add("keyboard__button--pressed");
      keyboardButton.click();
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    const keyboardButton = document.querySelector(
      `.keyboard__button[data-key="${key}"]`
    );
    if (keyboardButton) {
      keyboardButton.classList.remove("keyboard__button--pressed");
    }
  });

  document.body.appendChild(textField);
  document.body.appendChild(keyboard);
};

export default renderKeyboard;
