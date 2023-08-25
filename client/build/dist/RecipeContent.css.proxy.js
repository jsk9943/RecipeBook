// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".menuDetail {\r\n    overflow: hidden;\r\n    text-align: left;\r\n    background-color: rgba(255, 200, 105, 0.5);\r\n    border-radius: 20px;\r\n    padding: 10px 20px;\r\n    margin: 10px;\r\n}\r\n\r\n.menuDetail>p {\r\n    text-align: right;\r\n    font-size: 0.9em;\r\n    font-weight: bold;\r\n}\r\n\r\n.menuDetail>input {\r\n    float: right;\r\n    border: none;\r\n    background-color: rgb(255, 0, 0);\r\n    width: 10%;\r\n    padding: 10px;\r\n    font-weight: bold;\r\n    transition: all 0.3s;\r\n    border-radius: 10px;\r\n}\r\n\r\n.menuDetail>input:hover {\r\n    background-color: rgb(185, 5, 5);\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n\r\n#recipePhotoSize {\r\n    overflow: hidden;\r\n    width: 100%;\r\n}\r\n\r\n#recipePhotoSize>h2 {\r\n    float: left;\r\n}\r\n\r\n#recipePhotoSize>img {\r\n    float: right;\r\n    vertical-align: bottom;\r\n    width: 40%;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}