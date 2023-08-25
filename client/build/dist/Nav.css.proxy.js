// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "nav {\r\n    width: 90%;\r\n    margin:0 auto;\r\n    overflow: hidden;\r\n}\r\n\r\nnav>ul {\r\n    margin: 0 auto;\r\n    padding: 0px;\r\n}\r\n\r\nnav>ul>li {\r\n    margin:1%;\r\n    margin-top:2%;\r\n    list-style: none;\r\n    float: left;\r\n    border:none;\r\n    box-sizing: border-box;\r\n    border-radius: 20px;\r\n    width: 48%;\r\n    padding: 10px;\r\n    background-color: rgba(0, 0, 0, 0.2);\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 1.2em;\r\n    transition: all 0.3s;\r\n}\r\n\r\nnav>ul>li:hover {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    color: white;\r\n    cursor:pointer;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}