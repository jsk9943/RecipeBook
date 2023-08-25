/**
 * 서버에 저장되는 래시피 파일을 관리하기 위한 자바스크립트
 */
import { promises as fsPromises } from 'fs';
import path from 'path';
import { validate } from 'jsonschema';
const storagePath = '../storage';
// 레시피 명단
async function recipeStorage() {
    const filePath = path.join(storagePath, 'RecipeStorage.json');
    const fileContents = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}
// 각각의 레시피 불러오기
async function readJSONFile(filename) {
    const filePath = path.join(storagePath, filename);
    const fileContents = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}
// 각각의 레시피 사진 불러오기
async function readPhotoFile(recipeName) {
    try {
        const jsonData = await recipeDetail(recipeName);
        const fileName = jsonData.recipePhoto;
        const photoFilePath = path.join(storagePath, 'img', fileName);
        const photoData = await fsPromises.readFile(photoFilePath, 'base64');
        return photoData;
    } catch (error) {
        return null;
    }
}
// 각각의 레시피 댓글 불러오기
async function readComment(recipeName) {
    try {
        const jsonData = await recipeDetail(recipeName);
        const commentFileName = jsonData.recipeComment;
        const commentFilePath = path.join(storagePath, 'comment', commentFileName);
        const readCommentData = await fsPromises.readFile(commentFilePath, 'utf8');
        return JSON.parse(readCommentData);
    } catch (error) {
        return null;
    }
}
// 레시피 댓글 추가 하기
const commentAddData = async (commentData, recipeName) => {
    const jsonData = await recipeDetail(recipeName);
    const commentFileName = jsonData.recipeComment;
    const commentFilePath = path.join(storagePath, 'comment', commentFileName);
    const readCommentData = await fsPromises.readFile(commentFilePath, 'utf8');
    const jsonCommentData = JSON.parse(readCommentData);
    jsonCommentData.comment.unshift(commentData)
    const updatedCommentData = JSON.stringify(jsonCommentData, null, 2);
    await fsPromises.writeFile(commentFilePath, updatedCommentData, 'utf8');
}
// 초기 불러오는 모든 레시피
async function allRecipe() {
    let recipeObject = {};
    const jsonData = await recipeStorage(); // async/await를 사용하여 Promise 해결
    const valuesArray = Object.values(jsonData);
    for (const value of valuesArray) {
        const recipeData = await readJSONFile(value);
        let name = recipeData.recipeName;
        recipeObject[name] = recipeData;
    }
    return recipeObject;
}
// 검색한 레시피만 불러오기
async function searchRecipe(recipeWord) {
    let recipeObject = {};
    const jsonData = await recipeStorage();
    for (const name in jsonData) {
        const value = jsonData[name];
        const recipeData = await readJSONFile(value);
        if (name.includes(recipeWord) || recipeData.recipeName.includes(recipeWord)) {
            recipeObject[name] = recipeData;
        }
    }
    return recipeObject;
}
// 클릭한 레시피 불러오기
async function recipeDetail(recipeName) {
    const jsonData = await recipeStorage();
    return await readJSONFile(jsonData[recipeName]);
}
// 신규레시피 등록 전에 동일한 레시피가 있는지 확인
async function recipeExists(recipeName) {
    const jsonData = await recipeStorage();
    const recipeExist = jsonData[recipeName];
    let result = null;
    recipeExist === undefined ? result = false : result = true;
    return result;
}
// 레시피json 형태가 올바른지 스키마 검증 후 저장
async function recipeUpload(recipeData) {
    const schemaFilePath = path.join(storagePath, 'RecipeSchema.json');
    const schemaFileContents = await fsPromises.readFile(schemaFilePath, 'utf-8');
    const schema = JSON.parse(schemaFileContents);
    // 스키마 파일 검증
    const validationResult = validate(recipeData, schema);
    if (!validationResult.valid) {
        throw new Error();
    }
    // 스키마 검증 완료 후 파일 생성
    const jsonData = await recipeStorage();
    const now = new Date(); // 현재 날짜와 시간을 가져옴
    const year = now.getFullYear(); // 년도
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1을 하고, 두 자리로 표시)
    const day = String(now.getDate()).padStart(2, '0'); // 일 (두 자리로 표시)
    const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 조합
    const randomString = Math.random().toString(36).substring(2, 12); // 36진수 랜덤 문자열 10자리 생성
    const newFileName = `${formattedDate}-${randomString}.json`;
    const newCommentFileName = `co-${formattedDate}-${randomString}.json`
    const newRecipeData = {
        ...recipeData,
        recipeComment: newCommentFileName,
    }
    jsonData[recipeData.recipeName] = newFileName;
    const filePath = path.join(storagePath, 'RecipeStorage.json');
    await fsPromises.writeFile(filePath, JSON.stringify(jsonData));
    const newFilePath = path.join(storagePath, newFileName);
    await fsPromises.writeFile(newFilePath, JSON.stringify(newRecipeData));
    const newCommentFilePath = path.join(storagePath, 'comment', newCommentFileName);
    const newCommentFile = { comment: [] };
    await fsPromises.writeFile(newCommentFilePath, JSON.stringify(newCommentFile));
}
// 삭제하기 전 레시피 등록된 비밀번호 일치여부 확인
const reciepVerifyPassword = async (recipeName, recipePassword) => {
    const jsonData = await recipeDetail(recipeName)
    const isPasswordValid = jsonData.recipePassword.some(password => password === recipePassword);
    return isPasswordValid;
}
// 삭제 요청 들어온 레시피 파일 삭제 및 리스트 명단 삭제
const recipeDelete = async (recipeName) => {
    const filePath = path.join(storagePath, 'RecipeStorage.json'); // 전체 레시피 명단
    const jsonData = await recipeStorage(); // 전체 레시피명단 JSON 데이터 가져오기
    const deleteFilePath = path.join(storagePath, jsonData[recipeName]); // 삭제 할 레시피 파일경로 가져오기
    const jsonData2 = await recipeDetail(recipeName);
    const fileName = jsonData2.recipePhoto;
    if (fileName) {
        const photoFilePath = path.join(storagePath, 'img', fileName);
        await fsPromises.unlink(photoFilePath); // 레시피 사진파일 삭제
    }
    const deleteCommentFilePath = path.join(storagePath, 'comment', `co-${jsonData[recipeName]}`); // 삭제 할 레시피 댓글 파일경로 가져오기
    delete jsonData[recipeName]; // 레시피 명단에서 레시피 삭제
    await fsPromises.unlink(deleteFilePath); // 레시피 파일 삭제
    await fsPromises.unlink(deleteCommentFilePath); // 레시피 코멘트 파일 삭제
    await fsPromises.writeFile(filePath, JSON.stringify(jsonData)); // 삭제한 레시피 명단 갱신
}
export { allRecipe, searchRecipe, recipeDetail, recipeUpload, recipeDelete, readPhotoFile, recipeExists, readComment, commentAddData, reciepVerifyPassword };