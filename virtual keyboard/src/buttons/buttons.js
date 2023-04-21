export const russianKeyboardButtons = [
  // Ряд 1
  ["ё1234567890-=", { key: "Backspace", type: "backspace" }],

  // Ряд 2
  [{ key: "Tab", type: "tab" }, "йцукенгшщзхъ\\"],

  // Ряд 3
  [
    { key: "CapsLock", type: "capslock" },

    "фывапролджэ",
    { key: "Enter", type: "enter" },
  ],

  // Ряд 4
  [
    { key: "Shift", type: "shift-left" },
    "ячсмитьбю.",
    { key: "▲", type: "arrowTop" },
    { key: "Shift", type: "shift" },
  ],

  // Ряд 5
  [
    { key: "Ctrl", type: "control-left" },
    { key: "Win", type: "win" },
    { key: "Alt", type: "alt-left" },
    { key: " ", type: "space" },
    { key: "Alt", type: "alt" },
    { key: "Ctrl", type: "control" },
    { key: "◄", type: "arrowLeft" },
    { key: "▼", type: "arrowDown" },
    { key: "►", type: "arrowRight" },
  ],
];

export const englishKeyboardButtons = [
  [
    // Ряд 1
    "`1234567890-=",
    { key: "Backspace", type: "backspace" },
  ],
  [
    // Ряд 2
    { key: "Tab", type: "tab" },
    "qwertyuiop[]\\",
  ],
  [
    // Ряд 3
    { key: "CapsLock", type: "capslock" },
    "asdfghjkl;'",
    { key: "Enter", type: "enter" },
  ],
  [
    // Ряд 4
    { key: "Shift", type: "shift-left" },
    "zxcvbnm,./",
    { key: "▲", type: "arrowUp" },
    { key: "Shift", type: "shift" },
  ],
  [
    // Ряд 5
    { key: "Ctrl", type: "control-left" },
    { key: "Win", type: "win" },
    { key: "Alt", type: "alt-left" },
    { key: " ", type: "space" },
    { key: "Alt", type: "alt" },
    { key: "Ctrl", type: "control" },
    { key: "◄", type: "arrowLeft" },
    { key: "▼", type: "arrowDown" },
    { key: "►", type: "arrowRight" },
  ],
];
