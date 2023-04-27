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
      Backspace: () => (textField.value = textField.value.slice(0, -1)),
      Enter: () => (textField.value += "\n"),
      Space: () => (textField.value += " "),
      ShiftLeft: () => console.log("you click shift-left"),
      ShiftRight: () => console.log("you click ShiftRight"),
      CapsLock: () => console.log("you click CapsLock"),
      Tab: () => (textField.value += "  "),
      MetaLeft: () => console.log("you click Win"),
      ControlLeft: () => console.log("you click Ctrl-Left"),
      AltLeft: () => console.log("you click Alt-Left"),
      ControlRight: () => console.log("you click Ctrl"),
      AltRight: () => console.log("you click Alt"),
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
          `keyboard__button--${btn.code}`
        );
        btnEl.setAttribute("data-name", btn.code);
        btnEl.textContent = btn.key;
        btnEl.addEventListener("click", handleKeyboardButtonClick);
        rowEl.appendChild(btnEl);
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
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.code}`
    );
    if (keyboardButton) {
      keyboardButton.classList.add("pressed");
      keyboardButton.click();
    }
    if (event.code == "Tab") {
      //tab pressed
      event.preventDefault(); // stops its action
    }
  });

  document.addEventListener("keyup", (event) => {
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.code}`
    );
    if (keyboardButton) {
      keyboardButton.classList.remove("pressed");
    }
  });

  // Добавляем элементы на страницу
  document.body.append(textField, keyboard, changeLang);
};

export default renderKeyboard;
