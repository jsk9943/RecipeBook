// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".menuDiv {\r\n    text-align: center;\r\n}\r\n\r\n.menu {\r\n    width: 90%;\r\n    background-color: rgba(255, 200, 105, 0.5);\r\n    border-radius: 20px;\r\n    box-sizing: border-box;\r\n    margin: 5px;\r\n    text-align: center;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.menu>h2 {\r\n    float: left;\r\n    margin-left: 5%;\r\n}\r\n\r\n.menu>p {\r\n    float: right;\r\n    margin-right: 5%;\r\n}\r\n\r\n.menuTitle {\r\n    width: 90%;\r\n    display: inline-block;\r\n    margin-bottom: -5px;\r\n}\r\n\r\n.menuTitle>h4:first-child {\r\n    float: left;\r\n    margin-left: 10%;\r\n}\r\n\r\n.menuTitle>h4:last-child {\r\n    float: right;\r\n    margin-right: 5%;\r\n}\r\n\r\n.pagination {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 10px;\r\n}\r\n\r\n.pagination>button {\r\n    border: none;\r\n    background-color: rgb(112, 112, 253);\r\n    color:white;\r\n    font-weight: bold;\r\n    cursor: pointer;\r\n    transition:all 0.3s;\r\n    padding:10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.pagination>button:hover{\r\n    background-color: rgb(50, 50, 255);\r\n}\r\n\r\n.pageNumbers {\r\n    display: flex;\r\n    gap: 5px;\r\n}\r\n\r\n.pageNumbers>button {\r\n    border: none;\r\n    background-color: rgb(112, 112, 253);\r\n    color:white;\r\n    font-weight: bold;\r\n    cursor: pointer;\r\n    transition:all 0.3s;\r\n    padding:10px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.pageNumbers>button:hover{\r\n    background-color: rgb(50, 50, 255);\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}