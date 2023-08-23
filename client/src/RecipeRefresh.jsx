import { SERVERURL, PORT } from './ServerURL';
import axios from "axios";

export const recipeRefresh = async (dispatch) => {
    const recipeDatas = await axios.get(`${SERVERURL}:${PORT}/allRecipe.do`)
    dispatch({ type: 'set_Recipe_Data', payload: recipeDatas.data });
    dispatch({ type: 'set_Display_Content', payload: "RecipeContents" });
}