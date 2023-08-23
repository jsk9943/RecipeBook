/**
 * 레시피 스토리지(로컬)로만 통신 시 직접 파일에 접근하기 위한 js 파일
 */
import { useState } from "react";
import RecipeStorage from "./storage/RecipeStorage.json";


// 등록된 레시피 보여주기
const RecipeView = (props) => {
    const recipeName = props;

    if (recipeName === null || recipeName === undefined || recipeName === '') {
        return RecipeStorage; // 전체 레시피 return
    } else {
        const RecipeItems = RecipeStorage[recipeName];
        return RecipeItems; // 특정 레시피 return
    }
}


// 신규 레시피 등록
const RecipeWrite = (props) => {
    if (props === null || props === undefined) {
        return;
    } else {
        const [newItem, setNewItem] = useState(RecipeStorage);

        const newItemData = {
            ...RecipeStorage,
            [props.recipeName]: {
                "recipeName": props.recipeName,
                "recipeContents": props.recipeContents
            }
        }
        setNewItem(newItemData);
    }
}

export { RecipeView, RecipeWrite };
