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
    const keyboardButtonActions = {
      backspace: () => (textField.value = textField.value.slice(0, -1)),
      enter: () => (textField.value += "\n"),
      space: () => (textField.value += " "),
      "shift-left": () => console.log("you click shift-left"),
      shift: () => console.log("you click shift"),
      capsLock: () => console.log("you click CapsLock"),
      tab: () => console.log("you click Tab"),
      win: () => console.log("you click Win"),
      "control-left": () => console.log("you click Ctrl-Left"),
      "alt-left": () => console.log("you click Alt-Left"),
      control: () => console.log("you click Ctrl"),
      alt: () => console.log("you click Alt"),
    };

    const buttonAction =
      keyboardButtonActions[event.target.getAttribute("data-name")] ??
      (() => (textField.value += textContent));
    buttonAction();
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
        btnEl.setAttribute("data-name", btn.type);

        if (typeof btn === "string") {
          btn.split("").forEach((char) => {
            const charBtnEl = document.createElement("button");
            charBtnEl.classList.add("keyboard__button");
            charBtnEl.setAttribute("data-name", char);
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
  // обработчик смены языка комбинацией клавиш
  function handleKeyPress(event) {
    if (event.shiftKey && event.altKey) {
      keyboardButtons =
        keyboardButtons === buttons.russianKeyboardButtons
          ? buttons.englishKeyboardButtons
          : buttons.russianKeyboardButtons;
      changeLang.textContent =
        keyboardButtons === buttons.russianKeyboardButtons ? "ru" : "eng";
      renderBtn();
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  // Обработчики нажатия на клавиатуре
  document.addEventListener("keydown", (event) => {
    console.log(event.key);
    const keyboardChar = keyboard.querySelector(
      `.keyboard__button[data-name="${event.key}"]`
    );
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.key.toLocaleLowerCase()}`
    );
    if (keyboardChar) {
      keyboardChar.classList.add("keyboard__button--pressed");
      keyboardChar.click();
    } else if (keyboardButton) {
      keyboardButton.classList.add("pressed");
    }
  });

  document.addEventListener("keyup", (event) => {
    const keyboardChar = keyboard.querySelector(
      `.keyboard__button[data-name="${event.key}"]`
    );
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.key.toLocaleLowerCase()}`
    );
    if (keyboardChar) {
      keyboardChar.classList.remove("keyboard__button--pressed");
    } else if (keyboardButton) {
      keyboardButton.classList.remove("pressed");
    }
  });

  // Добавляем элементы на страницу
  document.body.append(textField, keyboard, changeLang);
};

export default renderKeyboard;
