import React, { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import './App.css';
import RecipePage from './RecipePage';
import RecipeUpload from './RecipeUpload';
import { RecipeContext } from './context/RecipeContext';
import { recipeRefresh } from './RecipeRefresh';

// Reducer 설정
// 상태값 전환이 필요한 개체들 담기
const initialState = {
  recipeData: '',
  displayContent: '',
  recipePhotoData: ''
};

// reducer로 변경 해야 할 개체들의 dispatch의 type 및 payload 값 설정
const reducer = (state, action) => {
  switch (action.type) {
    case 'set_Recipe_Data':
      return { ...state, recipeData: action.payload };
    case 'set_Display_Content':
      return { ...state, displayContent: action.payload };
    case 'set_Recipe_Photo_Data':
      return { ...state, recipePhotoData: action.payload };
    default:
      return state;
  }
}

const App = () => {
  // 리듀서 사용해보기
  const [state, dispatch] = useReducer(reducer, initialState);

  // 컴포넌트 render 이후 아래 작업을 수행 (마지막에 빈 배열([])을 전달함으로써 의존성 값을 없애 한번만 수행하게 만듬)
  // 빈 배열 삭제 시 무한루프로 작동 함
  useEffect(() => {
    async function fetchData() {
      // axios 라이브러리로 간편하게 작성하기
      try {
        recipeRefresh(dispatch);
      } catch (error) {
        const data = { error };
        dispatch({ type: 'set_Recipe_Data', payload: data })
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <RecipeContext.Provider value={{ dispatch, state }}>
        <article>
          <Nav />
          <Routes>
            <Route path="/recipeRead" element={<RecipePage />} />
            <Route path="/recipeUploadForm" element={<RecipeUpload />} />
          </Routes>
        </article>
    </RecipeContext.Provider>
  )
};


export default App;
