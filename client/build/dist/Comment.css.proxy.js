// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".commentArea {\r\n    background-color: rgba(46, 214, 63, 0.2);\r\n    border-radius: 50px;\r\n    margin-top: 100px;\r\n    margin-bottom: 20px;\r\n    box-sizing: border-box;\r\n    padding: 20px;\r\n    overflow: hidden;\r\n    width: 100%;\r\n}\r\n\r\n.commentArea>div>p {\r\n    border-bottom: 3px solid black;\r\n    margin: 0 auto;\r\n    margin-bottom: 10px;\r\n    padding: 10px;\r\n    width: 80%;\r\n    font-size:0.9em;\r\n    background-color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.commentArea>div>p>span {\r\n    font-weight: bold;\r\n}\r\n\r\n.commentArea>form{\r\n    display:flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-items: center;\r\n}\r\n\r\n.commentArea>form>input {\r\n    width: 50%;\r\n}\r\n\r\n.commentArea>form>button {\r\n    margin-top:10px;\r\n    width: 15%;\r\n    padding:5px;\r\n    border:none;\r\n    background-color: rgba(46, 208, 54, 0.5);\r\n    cursor: pointer;\r\n    border-radius: 20px;\r\n    font-weight: bold;\r\n    transition: all 0.3s;\r\n}\r\n\r\n.commentArea>form>button:hover {\r\n    background-color: rgba(16, 118, 72, 0.748);\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}