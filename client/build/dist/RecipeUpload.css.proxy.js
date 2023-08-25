// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#uploadForm {\r\n    overflow: hidden;\r\n    width: 90%;\r\n}\r\n\r\n#uploadForm>input {\r\n    float: right;\r\n    font-size: 1.5em;\r\n    width: 20vw;\r\n    height: 8vh;\r\n    margin-top: 20px;\r\n    margin-right: 20px;\r\n    border: 0px;\r\n    background-color: rgba(150, 200, 200, 0.5);\r\n    border-radius: 20px;\r\n}\r\n\r\n#uploadForm>input:hover {\r\n    color: rgb(0, 176, 150);\r\n    background-color: rgba(150, 200, 200, 0.9);\r\n}\r\n\r\n#uploadForm>div {\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n\r\n#uploadForm>div>h3 {\r\n    width: 100%;\r\n    text-align: left;\r\n}\r\n\r\n#uploadForm>div>input {\r\n    width: 80%;\r\n    height: 30px;\r\n    margin: 10px;\r\n}\r\n\r\n#cssProcess {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n#cssProcess>input {\r\n    width: 15%;\r\n    border: none;\r\n    padding: 10px 5px;\r\n    font-weight: bold;\r\n    margin-right: 20px;\r\n    cursor: pointer;\r\n    background-color: rgb(0, 176, 150);\r\n}\r\n\r\n#cssProcess>input:hover {\r\n    background-color: rgb(1, 113, 97);\r\n}\r\n\r\n#previewPhoto {\r\n    width:30%;\r\n    margin-top:10px;\r\n    border:2px solid black;\r\n    margin:0 auto;\r\n}\r\n\r\n#previewPhoto>img{\r\n    max-width: 100%;\r\n    vertical-align: bottom;\r\n}\r\n\r\n#photoInput {\r\n    display: flex;\r\n    margin-left:auto;\r\n    padding:20px;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}