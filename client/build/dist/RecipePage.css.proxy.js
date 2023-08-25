// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "form {\r\n    padding: 10px;\r\n    width: 90%;\r\n    margin:0 auto;\r\n}\r\n\r\nform>input:first-child {\r\n    height: 20px;\r\n}\r\n\r\nform>input:nth-child(2) {\r\n    margin-left: 10px;\r\n    width: 50px;\r\n    font-weight: bold;\r\n    background-color: rgb(74, 132, 83);\r\n    color: white;\r\n    padding: 7px 10px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: all 0.3s;\r\n    border-radius: 10px;\r\n}\r\n\r\nform>input:nth-child(2):hover {\r\n    background-color: rgb(47, 75, 51);\r\n}\r\n\r\nform>input:nth-child(3) {\r\n    float: right;\r\n    margin-right: 10px;\r\n    font-weight: bold;\r\n    background-color: rgb(136, 118, 238);\r\n    color: white;\r\n    padding: 7px 10px;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: all 0.3s;\r\n    border-radius: 10px;\r\n}\r\n\r\nform>input:nth-child(3):hover {\r\n    background-color: rgb(94, 70, 235);\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}