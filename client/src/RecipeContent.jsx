import React, { useContext } from "react";
import { SERVERURL, PORT } from './ServerURL';
import axios from "axios";
import { RecipeContext } from "./context/RecipeContext";
import './RecipeContent.css';

// 특정 레시피 return 태그
const RecipeContent = () => {
    const { dispatch, state } = useContext(RecipeContext);

    // 삭제버튼 클릭으로 레시피 삭제하기
    const recipeDelete = async (props) => {
        const deleteConfirm = window.confirm(`${props.recipeData.recipeName} 래시피를 삭제하시겠습니까?`); // 삭제 전 최종 확인 창 출력
        // 아니오를 누르면 return으로 기능 정지
        if (!deleteConfirm) {
            return;
        }

        // 예를 누르면 진행
        try {
            const deleteResult = await axios.delete(`${SERVERURL}:${PORT}/recipe/delete/${props.recipeData.recipeName}`); // 삭제할 레피시 전달
            alert(`${deleteResult.data}`); // 삭제 완료 안내
            const refreshecipeDatas = await axios.get(`${SERVERURL}:${PORT}/allRecipe.do`) // 레시피 명단 새로고침
            dispatch({ type: 'set_Recipe_Data', payload: refreshecipeDatas.data })
            dispatch({ type: 'set_Display_Content', payload: "RecipeContents" })
        } catch (error) {
            alert(`삭제 도중 ${error}가 발생하여 실패`)
        }
    }

    return (
        <div className="menuDiv">
            <div className="menuDetail">
                <div id="recipePhotoSize">
                    <h2>{state.recipeData.recipeName}</h2>
                    {state.recipePhotoData && (
                    <img src={`data:image/jpeg;base64,${state.recipePhotoData}`} alt={state.recipeData.recipeName} />
                    )}
                </div>
                <ol>
                    {state.recipeData.recipeContents.map((content, index) => (
                        <li key={index}>{content}</li>
                    ))}
                </ol>
                <p>작성일자 {'['} {state.recipeData.recipeDate} {state.recipeData.recipeTime} {']'}</p>
                <input type='button' value='삭제' onClick={() => { recipeDelete(state) }} />
            </div>
        </div>
    )
}

export default RecipeContent;