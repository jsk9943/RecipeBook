/**
 * form 태그를 이용하여 원하는 input 값을 recipeData 개체로 생성 후 server로 반환
 */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVERURL, PORT } from './ServerURL';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './RecipeUpload.css';
import { RecipeContext } from "./context/RecipeContext";
import { recipeRefresh } from "./RecipeRefresh";


const RecipeUpload = () => {
    // 새롭게 생성할 레시피 state
    const [recipeName, setRecipeName] = useState('');

    // 레시피 사진파일
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // 새롭게 생성할 레시피 프로세스 state
    const [cookingProcesses, setCookingProcesses] = useState(Array(3).fill(''));

    // App 컴포넌트에서 사용하는 state 가져오기
    const { dispatch } = useContext(RecipeContext)

    // 리액트 라우터와 연결시킬 네비게이트 명령어
    const navigate = useNavigate();

    // 입력된 조리순서를 index 순서대로 받아서 processInputData(cookingProcesses의 빈 배열)에 입력 후 set으로 입력
    const processInput = (index, value) => {
        const processInputData = [...cookingProcesses]; // 불변성을 지키기 위한 코드(초기 비어있는 배열이지만 그럼에도 입력하는 편이 좋음)
        processInputData[index] = value;
        setCookingProcesses(processInputData);
    }

    // 조리순서 추가 시 입력 할 cookingProcesses 내 배열을 늘리는 기능
    const addCookingProcess = () => {
        if (cookingProcesses.length < 100) {
            setCookingProcesses([...cookingProcesses, '']);
        }
    }

    // 업로드 하기 위한 파일 선택 시
    const fileInput = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile))
    }

    const recepiFormUpload = async (event) => {
        event.preventDefault();
        // 레시피명이 없을 경우
        if (recipeName.trim() === '') {
            alert('음식명을 입력해주세요.');
            return;
        }
        // 같은 레시피 이름이 있을 경우
        const response = await axios.get(`${SERVERURL}:${PORT}/recipeExist?recipeName=${recipeName}`)
        if (response.data.recipeName === recipeName) {
            alert(`${recipeName} 요리는 이미 등록되어있는 요리 입니다`)
            return;
        }
        // 조리과정이 하나도 입력되지 않은 경우
        if (cookingProcesses.every(process => process.trim() === '')) {
            alert('조리과정을 입력해주세요.');
            return;
        }
        const newRecipeConfirm = window.confirm(`${recipeName} 래시피를 등록하시겠습니까?`); // 등록 전 최종 확인 창 출력
        if (!newRecipeConfirm) {
            return;
        }
        // 파일이 없으면
        if (!file) {
            const newRecipePhotoConfirm = window.confirm(`${recipeName} 래시피를 사진 없이 등록하시겠습니까?`); // 등록 전 최종 확인 창 출력
            if (!newRecipePhotoConfirm) {
                return;
            }
        } 
        // 래시피 등록 일자 관리
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const toDayDate = `${year}-${month}-${day}`;
        const toDayTime = `${hours}:${minutes}:${seconds}`;
        let newFileName = "";
        if(file) {
            const fileTypeParts = file.type.split('/');
            const fileType = fileTypeParts[1];
            const uniqueId = uuidv4();
            newFileName = `${toDayDate}_${uniqueId}.${fileType}`;
        }
        // 서버와 통신하여 새로운 래시피 uploadRecipeData 개체를 전달
        try {
            const formData = new FormData();
            formData.append("recipeName", recipeName);
            formData.append("recipeContents", JSON.stringify(cookingProcesses.filter(process => process.trim() !== '')));
            formData.append("recipeDate", toDayDate);
            formData.append("recipeTime", toDayTime);
            formData.append("recipePhoto", newFileName);
            file ? formData.append('file', file, newFileName) : null ;
            const response = await axios.post(`${SERVERURL}:${PORT}/recipe/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert(response.data)
            recipeRefresh(dispatch);
            navigate('/recipeRead');
        } catch (error) {
            alert(`${error} 발생`);
        }
    }

    return (
        <div>
            <form id="uploadForm" onSubmit={recepiFormUpload} method='POST'>
                <h1>레시피 등록</h1>
                <div>
                    <h3>음식명</h3>
                    <input type="text" placeholder='음식명' value={recipeName} onChange={(event) => setRecipeName(event.target.value)} />
                    <h3>음식사진</h3>
                    <div>
                        <div id="previewPhoto">
                            {previewUrl ? (
                                <img src={previewUrl} alt="File Preview" />
                            ) : (
                                <p>선택된 파일이 없습니다.</p>
                            )}
                        </div>
                        <input id="photoInput" type="file" onChange={fileInput} />
                    </div>
                    <div id="cssProcess">
                        <h3>조리과정</h3>
                        {/** 버튼 클릭하면 조리순서 input 창 추가 */}
                        <input type='button' value='순서 추가하기' onClick={addCookingProcess} />
                    </div>
                    {/** 생성된 cookingProcesses의 배열에 요소(process)와 index를 받아 input 요소를 생성 */}
                    {cookingProcesses.map((process, index) => (
                        // cookingProcesses 배열에서 받아온 index를 각 index에 맞춰 event.target.value 값을 입력
                        <input key={index} type="text" placeholder={`조리순서 ${index + 1}`} value={process} onChange={(event) => processInput(index, event.target.value)} />
                    ))}
                </div>
                <input type='submit' value='등록하기' />
            </form>
        </div>
    )
}

export default RecipeUpload;