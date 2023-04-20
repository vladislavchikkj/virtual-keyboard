export const russianKeyboardButtons = [
  // Ряд 1
  ["ё1234567890-=", { key: "Backspace", type: "control" }],

  // Ряд 2
  [{ key: "Tab", type: "control" }, "йцукенгшщзхъ\\"],

  // Ряд 3
  [
    { key: "CapsLock", type: "control" },

    "фывапролджэ",
    { key: "Enter", type: "control" },
  ],

  // Ряд 4
  [
    { key: "Shift", type: "control" },
    "ячсмитьбю.",
    { key: "▲", type: "arrow" },
    { key: "Shift", type: "control" },
  ],

  // Ряд 5
  [
    { key: "Control", type: "control" },
    { key: "Win", type: "control" },
    { key: "Alt", type: "control" },
    { key: " ", type: "space" },
    { key: "Alt", type: "control" },
    { key: "Control", type: "control" },
    { key: "◄", type: "arrow" },
    { key: "▼", type: "arrow" },
    { key: "►", type: "arrow" },
  ],
];

export const englishKeyboardButtons = [
  [
    // Ряд 1
    "`1234567890-=",
    { key: "Backspace", type: "control" },
  ],
  [
    // Ряд 2
    { key: "Tab", type: "control" },
    "qwertyuiop[]\\",
  ],
  [
    // Ряд 3
    { key: "CapsLock", type: "control" },
    { key: "a", shiftKey: "A" },
    "sdfghjkl;'",
    { key: "Enter", type: "control" },
  ],
  [
    // Ряд 4
    { key: "Shift", type: "control" },
    "zxcvbnm,./",
    { key: "▲", type: "arrowUp" },
    { key: "Shift", type: "control" },
  ],
  [
    // Ряд 5
    { key: "Control", type: "control" },
    { key: "Win", type: "control" },
    { key: "Alt", type: "control" },
    { key: " ", type: "space" },
    { key: "Alt", type: "control" },
    { key: "Control", type: "control" },
    { key: "◄", type: "arrowLeft" },
    { key: "▼", type: "arrowDown" },
    { key: "►", type: "arrowRight" },
  ],
];
