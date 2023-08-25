// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "header {\r\n    background-color: rgba(111, 133, 108, 0.8);\r\n    padding:20px;\r\n    text-align: center;\r\n    border-radius: 0px 0px 25px 25px;\r\n    box-shadow: 0 5px 5px;\r\n    cursor: pointer;\r\n}\r\n\r\nheader>div{\r\n    font-size:2em;\r\n}\r\n\r\nheader>div>span {\r\n    font-family: 'Bebas Neue', sans-serif;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}