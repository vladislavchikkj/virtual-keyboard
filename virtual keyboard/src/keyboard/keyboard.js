import "./_keyboard.scss";
import * as buttons from "../buttons/buttons";

const renderKeyboard = () => {
  // Создаем элементы и добавляем классы
  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = "RSS Virtual Keyboard";

  const descr = document.createElement("div");
  descr.classList.add("descr");
  descr.innerHTML = `<h3>
  Клавиатура создана в операционной системе Windows <br>  Для переключения языка комбинация: левыe shift + alt
</h4>`;

  const textField = document.createElement("textarea");
  textField.classList.add("text-field");

  const changeLang = document.createElement("button");
  changeLang.classList.add("change-lang-btn");
  if (localStorage.getItem("Lang") === "ru") {
    changeLang.textContent = "ru";
  } else {
    changeLang.textContent = "eng";
  }

  const ruLang = buttons.russianKeyboardButtons;
  const enLang = buttons.englishKeyboardButtons;
  let keyboardButtons = ruLang;

  if (localStorage.getItem("Lang") === "ru") {
    keyboardButtons = ruLang;
  } else {
    keyboardButtons = enLang;
  }

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
        rowEl.appendChild(btnEl);
      });

      keyboard.appendChild(rowEl);
    });

    keyboard.addEventListener("click", handleKeyboardButtonClick);
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
        handleCapsLockPress();
      },
      ShiftRight: () => {
        handleCapsLockPress();
      },
      CapsLock: () => {
        handleCapsLockPress();
      },
      Tab: () => (textField.value += "  "),
      MetaLeft: () => {},
      ControlLeft: () => {},
      AltLeft: () => {},
      ControlRight: () => {},
      AltRight: () => {},
    };

    const buttonAction =
      keyboardButtonActions[event.target.getAttribute("data-name")] ??
      (() => (textField.value += textContent));
    buttonAction();
  }

  // Обработчик нажатия на кнопку смены языка
  changeLang.addEventListener("click", () => {
    keyboardButtons = keyboardButtons === ruLang ? enLang : ruLang;
    changeLang.textContent = keyboardButtons === ruLang ? "ru" : "eng";
    renderBtn();
    if (keyboardButtons === ruLang) {
      localStorage.setItem("Lang", "ru");
    } else {
      localStorage.setItem("Lang", "en");
    }
  });
  // обработчик смены языка комбинацией клавиш
  function handleKeyPress(event) {
    if (event.shiftKey && event.altKey) {
      keyboardButtons = keyboardButtons === ruLang ? enLang : ruLang;
      changeLang.textContent = keyboardButtons === ruLang ? "ru" : "eng";
      renderBtn();
      if (keyboardButtons === ruLang) {
        localStorage.setItem("Lang", "ru");
      } else {
        localStorage.setItem("Lang", "en");
      }
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  // обработчик нажатия клавиши СapsLock
  function handleCapsLockPress() {
    const capsElements = document.querySelectorAll(".symbol");
    const capsLockBtn = document.querySelector(".keyboard__button--CapsLock");
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
  }

  // обработчик нажатия клавиши shift
  function handleShiftPress() {
    const shiftButtons = document.querySelectorAll(".shift");
    // const shiftButton = document.querySelector(".shift");
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
  }
  document.addEventListener("keydown", (event) => {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      handleShiftPress();
    }
  });
  keyboard.addEventListener("mousedown", (event) => {
    if (event.target.getAttribute("data-name") === "ShiftLeft") {
      handleShiftPress();
    }
  });

  // обработчик отжатия клавиши shift
  function handleShiftSqueeze(event) {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      renderBtn();
    }
    if (event.target.getAttribute("data-name") === "ShiftLeft") {
      renderBtn();
    }
  }
  document.addEventListener("keyup", handleShiftSqueeze);
  keyboard.addEventListener("mouseup", handleShiftSqueeze);

  // Обработчики нажатия кнопок на клавиатуре
  document.addEventListener("keydown", (event) => {
    textField.blur();
    const keyboardButton = keyboard.querySelector(
      `.keyboard__button.keyboard__button--${event.code}`
    );
    if (keyboardButton) {
      keyboardButton.classList.add("pressed");
    }
    if (
      event.code === "Tab" ||
      event.code === "AltLeft" ||
      event.code === "AltRight"
    ) {
      //tab pressed
      event.preventDefault(); // stops its action
    }
    if (textField !== document.activeElement && keyboardButton) {
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
  document.body.append(title, textField, keyboard, changeLang, descr);
};

export default renderKeyboard;
