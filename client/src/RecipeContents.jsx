/**
 * 받아온 레시피Data를 순서에 맞춰 html 태그로 return 해주는 js
 */
import React, { useContext, useMemo, useState } from "react";
import { SERVERURL, PORT } from './ServerURL';
import axios from "axios";
import './RecipeContents.css';
import { RecipeContext } from "./context/RecipeContext";

// 전체 레시피 return 태그
const RecipeContents = () => {
    const { dispatch, state } = useContext(RecipeContext); // 컴포넌트 호출 시 전달받은 props의 값을 저장

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
    const recipesPerPage = 5; // 페이지당 레시피 수
    const recipeKeys = Object.keys(state.recipeData);
    const startIdx = (currentPage - 1) * recipesPerPage;
    const endIdx = startIdx + recipesPerPage;
    const recipesToShow = useMemo(() => recipeKeys.slice(startIdx, endIdx), [recipeKeys, startIdx, endIdx]);

    // 클릭한 요소의 레시피 이름 가져와서 조리방법 보여주기
    const recipeClickEvent = async (event) => {
        event.preventDefault();
        const targetElement = event.target; // div 안에 요소가 2개가 더 있으므로 확인이 필요하여 부모요소 타겟설정
        let recipeName = '';
        if (targetElement) {
            let readElement = targetElement.querySelector('h2');
            if (!readElement) {
                const closestElement = targetElement.closest('.menu'); // h2 요소를 못 찾으면 가까운 div를 선택
                readElement = closestElement.querySelector('h2'); // 가까운 div 안에 h2 태그를 선택
                recipeName = readElement.textContent; // h2 태그의 text 값을 입력
            } else {
                recipeName = readElement.textContent; // h2 태그의 text 값을 입력
            }
        }
        const response = await axios.get(`${SERVERURL}:${PORT}/recipe?recipeName=${recipeName}`) // 입력된 래시피 이름으로 래시피 조리방법 받아오기
        if (response.data.success) {
            dispatch({ type: 'set_Recipe_Data', payload: response.data.data.recipeData });
            dispatch({ type: 'set_Recipe_Photo_Data', payload: response.data.data.photoData });
            dispatch({ type: 'set_Display_Content', payload: "RecipeContent" });
        } else {
            console.error(response.data.error);
        }
    }

    return (
        <div className="menuDiv">
            <div className="menuTitle">
                <h4>레시피 제목</h4>
                <h4>레시피 작성일자</h4>
            </div>
            {recipesToShow.map((recipeName) => (
                <div key={recipeName} className="menu" onClick={recipeClickEvent}>
                    <h2>{state.recipeData[recipeName].recipeName}</h2>
                    <p>{state.recipeData[recipeName].recipeDate}</p>
                </div>
            ))}

            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전 페이지</button>
                <div className="pageNumbers">
                    {Array.from({ length: Math.ceil(Object.keys(state.recipeData).length / recipesPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIdx >= Object.keys(state.recipeData).length}>다음 페이지</button>
            </div>
        </div>
    )
}



export default RecipeContents;