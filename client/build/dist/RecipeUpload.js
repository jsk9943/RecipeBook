import React, {useContext, useState} from "../_snowpack/pkg/react.js";
import {useNavigate} from "../_snowpack/pkg/react-router-dom.js";
import {SERVERURL, PORT} from "./ServerURL.js";
import axios from "../_snowpack/pkg/axios.js";
import {v4 as uuidv4} from "../_snowpack/pkg/uuid.js";
import "./RecipeUpload.css.proxy.js";
import {RecipeContext} from "./context/RecipeContext.js";
import {recipeRefresh} from "./RecipeRefresh.js";
const RecipeUpload = () => {
  const [recipeName, setRecipeName] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cookingProcesses, setCookingProcesses] = useState(Array(3).fill(""));
  const {dispatch} = useContext(RecipeContext);
  const navigate = useNavigate();
  const processInput = (index, value) => {
    const processInputData = [...cookingProcesses];
    processInputData[index] = value;
    setCookingProcesses(processInputData);
  };
  const addCookingProcess = () => {
    if (cookingProcesses.length < 100) {
      setCookingProcesses([...cookingProcesses, ""]);
    }
  };
  const fileInput = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };
  const recepiFormUpload = async (event) => {
    event.preventDefault();
    if (recipeName.trim() === "") {
      alert("음식명을 입력해주세요.");
      return;
    }
    const response = await axios.get(`${SERVERURL}:${PORT}/recipeExist?recipeName=${recipeName}`);
    if (response.data) {
      alert(`${recipeName} 요리는 이미 등록되어있는 요리 입니다`);
      return;
    }
    if (cookingProcesses.every((process) => process.trim() === "")) {
      alert("조리과정을 입력해주세요.");
      return;
    }
    const newRecipeConfirm = window.confirm(`${recipeName} 래시피를 등록하시겠습니까?`);
    if (!newRecipeConfirm) {
      return;
    }
    if (!file) {
      const newRecipePhotoConfirm = window.confirm(`${recipeName} 래시피를 사진 없이 등록하시겠습니까?`);
      if (!newRecipePhotoConfirm) {
        return;
      }
    }
    const recipePassword = window.prompt(`삭제 시 필요한 비밀번호를 입력하세요
(미 입력 시 레시피 등록 불가)`);
    if (recipePassword === "") {
      alert("비밀번호 미 입력으로 등록 실패");
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const toDayDate = `${year}-${month}-${day}`;
    const toDayTime = `${hours}:${minutes}:${seconds}`;
    const passwordData = ["1q2w3e4r5t!", recipePassword];
    let newFileName = "";
    if (file) {
      const fileTypeParts = file.type.split("/");
      const fileType = fileTypeParts[1];
      const uniqueId = uuidv4();
      newFileName = `${toDayDate}_${uniqueId}.${fileType}`;
    }
    try {
      const formData = new FormData();
      formData.append("recipeName", recipeName);
      formData.append("recipeContents", JSON.stringify(cookingProcesses.filter((process) => process.trim() !== "")));
      formData.append("recipeDate", toDayDate);
      formData.append("recipeTime", toDayTime);
      formData.append("recipePassword", JSON.stringify(passwordData));
      formData.append("recipePhoto", newFileName);
      file ? formData.append("file", file, newFileName) : null;
      const response2 = await axios.post(`${SERVERURL}:${PORT}/recipe/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(response2.data);
      if (response2.data === "파일 유효성 검증 실패") {
        return;
      }
      recipeRefresh(dispatch);
      navigate("/recipeRead");
    } catch (error) {
      alert(`${error} 발생`);
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("form", {
    id: "uploadForm",
    onSubmit: recepiFormUpload,
    method: "POST"
  }, /* @__PURE__ */ React.createElement("h1", null, "레시피 등록"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "음식명"), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "음식명",
    value: recipeName,
    onChange: (event) => setRecipeName(event.target.value)
  }), /* @__PURE__ */ React.createElement("h3", null, "음식사진"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    id: "previewPhoto"
  }, previewUrl ? /* @__PURE__ */ React.createElement("img", {
    src: previewUrl,
    alt: "File Preview"
  }) : /* @__PURE__ */ React.createElement("p", null, "선택된 파일이 없습니다.")), /* @__PURE__ */ React.createElement("input", {
    id: "photoInput",
    type: "file",
    onChange: fileInput
  })), /* @__PURE__ */ React.createElement("div", {
    id: "cssProcess"
  }, /* @__PURE__ */ React.createElement("h3", null, "조리과정"), /* @__PURE__ */ React.createElement("input", {
    type: "button",
    value: "순서 추가하기",
    onClick: addCookingProcess
  })), cookingProcesses.map((process, index) => /* @__PURE__ */ React.createElement("input", {
    key: index,
    type: "text",
    placeholder: `조리순서 ${index + 1}`,
    value: process,
    onChange: (event) => processInput(index, event.target.value)
  }))), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "등록하기"
  })));
};
export default RecipeUpload;
