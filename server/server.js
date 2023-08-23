import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { allRecipe, searchRecipe, recipeDetail, recipeUpload, recipeDelete, readPhotoFile, recipeExists } from './Storage.js';
const app = express();
const PORT = 5555;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../storage/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });
//post에서 body로 들어오는 데이터 파싱하기 위한 라이브러리 등록
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// 서버에 저장된 모든 래시피를 클라이언트 반환
app.get('/allRecipe.do', async (req, res) => {
    try {
        const data = await allRecipe();
        res.json(data);
    } catch (error) {
        const data = {};
        res.json(data);
    }
})
// 검색한 레시피만 클라이언트에 반환
app.get('/recipe/search', async (req, res) => {
    try {
        const recipeWord = req.query.recipeWord;
        const data = await searchRecipe(recipeWord)
        res.json(data)
    } catch (error) {
        const data = { error };
        res.json(data);
    }
})
// 특정 래시피 JSON 파일만 찾아서 클라이언트 반환
app.get('/recipe', async (req, res) => {
    try {
        const recipeName = req.query.recipeName;
        const recipeData = await recipeDetail(recipeName);
        const photoData = await readPhotoFile(recipeName);
        if (photoData !== null) {
            res.json({ success: true, data: { recipeData, photoData: photoData.toString('base64') } });
        } else {
            res.json({ success: true, data: { recipeData } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
// 레시피 신규등록 전 동일 파일이 있는지 확인
app.get('/recipeExist', async (req, res) => {
    try {
        const recipeName = req.query.recipeName;
        res.json(await recipeExists(recipeName));
    } catch (error) {
        res.status(500).json(error);
    }
})
// 클라이언트가 POST로 보낸 신규 래시피를 서버에 JSON파일 저장
app.post('/recipe/upload', upload.single('file'), async (req, res) => {
    try {
        const recipeData = req.body;
        recipeData.recipeContents = JSON.parse(recipeData.recipeContents);
        await recipeUpload(recipeData);
        res.send('success');
    } catch (error) {
        res.send(error);
    }
})
// 삭제 요청이 들어온 레시피 파일 삭제 및 명단 삭제
app.delete('/recipe/delete/:recipeName', async (req, res) => {
    try {
        const recipeName = req.params.recipeName;
        await recipeDelete(recipeName);
        res.send('success');
    } catch (error) {
        res.status(500).send('error');
    }
});

app.listen(PORT, () => {
    console.log('Start Server!')
})