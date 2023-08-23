import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client"; // 18버전 이상
import App from "./App";
import Footer from "./Footer";
import Header from "./Header";

// 리액트 v18부터 권장하는 createRoot로 초기화하는 방식
const root = ReactDOM.createRoot(document.getElementById('recipeNav'));

const Apps = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
            <Footer />
        </Router>
    )
}

root.render(
    <Apps />
);

