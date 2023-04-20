import "./_keyboard.scss";
import * as buttons from "../buttons/buttons";

const renderKeyboard = () => {
  // Создаем элементы и добавляем классы
  const textField = document.createElement("textarea");
  textField.classList.add("text-field");

  const changeLang = document.createElement("button");
  changeLang.classList.add("change-lang-btn");
  changeLang.textContent = "ru";

  let keyboardButtons = buttons.russianKeyboardButtons;

  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  // Функция обработчика нажатия на кнопки клавиатуры
  function handleKeyboardButtonClick(event) {
    if (event.target.tagName !== "BUTTON") return;

    const { textContent } = event.target;
    if (textContent === "Backspace") {
      textField.value = textField.value.slice(0, -1);
    } else if (textContent === "Enter") {
      textField.value += "\n";
    } else if (textContent === "Space") {
      textField.value += " ";
    } else {
      textField.value += textContent;
    }
  }

  // Функция рендера кнопок клавиатуры
  function renderBtn() {
    keyboard.innerHTML = "";

    keyboardButtons.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.classList.add("keyboard__row");

      row.forEach((btn) => {
        const btnEl = document.createElement("button");
        btnEl.classList.add(
          "keyboard__button",
          `keyboard__button--${btn.type}`
        );

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
  }

  renderBtn();

  // Обработчик нажатия на кнопку смены языка
  changeLang.addEventListener("click", () => {
    keyboardButtons =
      keyboardButtons === buttons.russianKeyboardButtons
        ? buttons.englishKeyboardButtons
        : buttons.russianKeyboardButtons;
    changeLang.textContent =
      keyboardButtons === buttons.russianKeyboardButtons ? "ru" : "eng";
    renderBtn();
  });

  // Обработчики нажатия на клавиатуре
  document.addEventListener("keydown", (event) => {
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button[data-key="${event.key}"]`
    );
    if (keyboardButton) {
      keyboardButton.classList.add("keyboard__button--pressed");
      keyboardButton.click();
    }
  });

  document.addEventListener("keyup", (event) => {
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button[data-key="${event.key}"]`
    );
    if (keyboardButton) {
      keyboardButton.classList.remove("keyboard__button--pressed");
    }
  });

  // Добавляем элементы на страницу
  document.body.append(textField, keyboard, changeLang);
};

export default renderKeyboard;
