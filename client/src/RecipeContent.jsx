import React, { useContext } from "react";
import { SERVERURL, PORT } from './ServerURL';
import axios from "axios";
import { RecipeContext } from "./context/RecipeContext";
import './RecipeContent.css';
import Comment from "./Comment";
import { recipeRefresh } from "./RecipeRefresh";

// 특정 레시피 return 태그
const RecipeContent = () => {
    const { dispatch, state } = useContext(RecipeContext);
    // 삭제버튼 클릭으로 레시피 삭제하기
    const recipeDelete = async (props) => {
        const recipeName = props.recipeData.recipeName;
        const deleteConfirm = window.confirm(`${recipeName} 래시피를 삭제하시겠습니까?`); // 삭제 전 최종 확인 창 출력
        // 아니오를 누르면 return으로 기능 정지
        if (!deleteConfirm) {
            return;
        }
        // 예를 누르면 진행
        try {
            const recipePassword = window.prompt('삭제하실 레시피의 비밀번호를 입력해주세요');
            const response = await axios.post(`${SERVERURL}:${PORT}/recipe/delete`, { "recipeName": recipeName, "recipePassword": recipePassword }); // 삭제할 레피시 전달
            if (!response.data) {
                alert('패스워드가 불일치 합니다');
                return;
            }
            const deleteResult = await axios.delete(`${SERVERURL}:${PORT}/recipe/delete/${recipeName}`); // 삭제할 레피시 전달
            alert(`${deleteResult.data}`); // 삭제 완료 안내
            recipeRefresh(dispatch);
        } catch (error) {
            alert(`삭제 도중 ${error}가 발생하여 실패`)
        }
    }

    return (
        <div className="menuDiv">
            <div className="menuDetail">
                <div id="recipePhotoSize">
                    <h1>{state.recipeData.recipeName}</h1>
                    {state.recipePhotoData && (
                        <img src={`data:image/jpeg;base64,${state.recipePhotoData}`} alt={state.recipeData.recipeName} />
                    )}
                    <div id="decriptionContent">
                        <h3>음식소개</h3>
                        <div>
                            {
                                state.recipeData.recipeDescription
                                    ? state.recipeData.recipeDescription.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))
                                    : <span>소개란이 비어있습니다</span>
                            }
                        </div>
                    </div>
                </div>
                <div id="cookingProcess">
                    <h3>요리방법</h3>
                    <div>
                        <ol>
                            {state.recipeData.recipeContents.map((content, index) => (
                                <li key={index}>{content}</li>
                            ))}
                        </ol>
                    </div>
                </div>
                <p>작성일자 {'['} {state.recipeData.recipeDate} {state.recipeData.recipeTime} {']'}</p>
                <input type='button' value='삭제' onClick={() => { recipeDelete(state) }} />
                <Comment recipeName={state.recipeData.recipeName} />
            </div>
        </div>
    )
}

export default RecipeContent;