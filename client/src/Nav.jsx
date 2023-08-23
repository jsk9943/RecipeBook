import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from "./context/RecipeContext";
import { recipeRefresh } from "./RecipeRefresh";
import './Nav.css'

const Nav = () => {
    const { dispatch } = useContext(RecipeContext);

    const navigate = useNavigate();

    const recipeReadPage = () => {
        recipeRefresh(dispatch)
        navigate('/recipeRead');
    }

    const recipeUploadFormPage = () => {
        navigate('/recipeUploadForm');
    }

    return (
        <nav>
            <ul>
                <li onClick={() => { recipeReadPage() }}>레시피 보기</li>
                <li onClick={() => { recipeUploadFormPage() }}>레시피 등록</li>
            </ul>
        </nav>
    );
}

export default Nav;