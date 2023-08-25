// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "footer {\r\n    margin-top:30px;\r\n    margin-bottom:10px;\r\n    border-radius:10px;\r\n    height: 70px;\r\n    line-height:70px;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size:1.5em;\r\n    background-color: rgba(0,0,0,0.5);\r\n    color: white;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}