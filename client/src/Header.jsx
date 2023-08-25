import React from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const handleSpanClick = () => {
        // 클릭 시 App 컴포넌트를 렌더링하는 페이지 경로로 이동
        navigate("/page");
    };

    return (
        <header>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            </style>
            <div>
                <span onClick={handleSpanClick}>Recipe Book</span>
            </div>
        </header>
    )
}

export default Header;