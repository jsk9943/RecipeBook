/**
 * 레시피 목록 및 조리방법 페이지
 */
import React, { useContext, useState } from "react";
import { SERVERURL, PORT } from './ServerURL';
import RecipeContents from './RecipeContents';
import RecipeContent from "./RecipeContent";
import axios from 'axios';
import './RecipePage.css';
import { RecipeContext } from "./context/RecipeContext";
import { recipeRefresh } from "./RecipeRefresh";

// const RecipePage = (props) => {
const RecipePage = () => {
    const { dispatch, state } = useContext(RecipeContext);
    const [recipeSearchWord, setRecipeSearchWord] = useState(); // 검색 단어 상태변경을 위한 useState 사용

    // 특정 레시피만 단어로 찾아오기
    const searchButtonClickEvent = async (event) => {
        event.preventDefault(); // form 양식 초기화 방지
        if (recipeSearchWord) {
            try {
                const response = await axios.get(`${SERVERURL}:${PORT}/recipe/search?recipeWord=${recipeSearchWord}`);
                if (Object.keys(response.data).length !== 0) {
                    dispatch({ type: 'set_Recipe_Data', payload: response.data })
                    dispatch({ type: 'set_Display_Content', payload: "RecipeContents" })
                } else {
                    alert(`찾을 수 없는 메뉴입니다`);
                }
            } catch (error) {
                alert(error);
            }
        } else {
            recipeRefresh(dispatch);
        }
    }

    return (
        <div>
            <form onSubmit={searchButtonClickEvent}>
                <input type='text' placeholder="음식이름" onChange={(event) => {
                    setRecipeSearchWord(event.target.value)
                }} />
                <input type="submit" value="검색" />
                <input type="button" value="전체보기" onClick={() => { recipeRefresh(dispatch) }} />
            </form>
            {/** 기본값은 RecipeContents로 모든 레시피를 보여주고 displayContent 값이 RecipeContent 조건으로 바뀌면 컴포넌트 변경  */}
            {state.displayContent === "RecipeContents" ? (
                <RecipeContents /> // 클릭시 상태값 전달 받기 위해 props 셋팅
            ) : (
                <RecipeContent />
            )}
        </div>
    )
}

export default RecipePage;