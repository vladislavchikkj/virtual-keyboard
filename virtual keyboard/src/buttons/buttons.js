export const russianKeyboardButtons = [
  // Ряд 1
  ["ё1234567890-=", { key: "Backspace", type: "control" }],

  // Ряд 2
  [
    { key: "Tab", type: "control" },
    "йцукенгшщзхъ\\",
    { key: "CapsLock", type: "control" },
  ],

  // Ряд 3
  ["фывапролджэ", { key: "Enter", type: "control" }],

  // Ряд 4
  [
    { key: "Shift", type: "control" },
    "ячсмитьбю.",
    { key: "ArrowUp", type: "arrow" },
    { key: "Shift", type: "control" },
  ],

  // Ряд 5
  [
    { key: "Control", type: "control" },
    { key: "Alt", type: "control" },
    { key: " ", type: "space" },
    { key: "Alt", type: "control" },
    { key: "ArrowLeft", type: "arrow" },
    { key: "ArrowDown", type: "arrow" },
    { key: "ArrowRight", type: "arrow" },
    { key: "Control", type: "control" },
  ],
];

export const englishKeyboardButtons = [
  // Ряд 1
  "`~1!2@3#4$5%6^7&8*9(0)-_+=",
  { key: "Backspace", type: "control" },

  // Ряд 2
  { key: "Tab", type: "control" },
  "qwertyuiop[]\\",
  { key: "CapsLock", type: "control" },

  // Ряд 3
  { key: "a", shiftKey: "A" },
  "sdfghjkl;'",
  { key: "Enter", type: "control" },

  // Ряд 4
  { key: "Shift", type: "control" },
  "zxcvbnm,./",
  { key: "ArrowUp", type: "arrow" },
  { key: "Shift", type: "control" },

  // Ряд 5
  { key: "Control", type: "control" },
  { key: "Alt", type: "control" },
  { key: " ", type: "space" },
  { key: "Alt", type: "control" },
  { key: "ArrowLeft", type: "arrow" },
  { key: "ArrowDown", type: "arrow" },
  { key: "ArrowRight", type: "arrow" },
  { key: "Control", type: "control" },
];
