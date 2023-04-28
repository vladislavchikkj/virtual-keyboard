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
          `keyboard__button--${btn.code}`,
          `${btn.type}`
        );
        btnEl.setAttribute("data-name", btn.code);
        if ("shift" in btn) {
          btnEl.classList.add(`shift`);
        }
        btnEl.textContent = btn.key;
        btnEl.addEventListener("click", handleKeyboardButtonClick);
        rowEl.appendChild(btnEl);
      });

      keyboard.appendChild(rowEl);
    });
  }

  renderBtn();

  // Функция обработчика нажатия на кнопки клавиатуры
  function handleKeyboardButtonClick(event) {
    if (event.target.tagName !== "BUTTON") return;

    const { textContent } = event.target;
    const keyboardButtonActions = {
      Backspace: () => (textField.value = textField.value.slice(0, -1)),
      Enter: () => (textField.value += "\n"),
      Space: () => (textField.value += " "),
      ShiftLeft: () => {
        const shiftButtons = document.querySelectorAll(".shift");
        let shiftArr = [];
        keyboardButtons.forEach((row) => {
          row.forEach((btn) => {
            if ("shift" in btn) {
              shiftArr.push(btn.shift);
            }
          });
        });
        for (let i = 0; i < shiftButtons.length; i++) {
          shiftButtons[i].innerHTML = shiftArr[i];
        }
      },
      ShiftRight: () => console.log("you click ShiftRight"),
      CapsLock: () => {
        const capsElements = document.querySelectorAll(".symbol");
        const capsLockBtn = document.querySelector(
          ".keyboard__button--CapsLock"
        );
        if (capsLockBtn.classList.contains("Up")) {
          capsElements.forEach((symbol) => {
            symbol.innerHTML = symbol.innerHTML.toLowerCase();
            capsLockBtn.classList.remove("Up");
          });
          renderBtn();
        } else {
          capsElements.forEach((symbol) => {
            symbol.innerHTML = symbol.innerHTML.toUpperCase();
            capsLockBtn.classList.add("Up");
          });
        }
      },
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
    textField.blur();
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.code}`
    );
    if (keyboardButton) {
      keyboardButton.classList.add("pressed");
    }
    if (event.code == "Tab") {
      //tab pressed
      event.preventDefault(); // stops its action
    }
    if (event.code == "ShiftLeft") {
      console.log(123);
    }
    if (textField !== document.activeElement) {
      keyboardButton.click();
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
