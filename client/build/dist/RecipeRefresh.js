import {SERVERURL, PORT} from "./ServerURL.js";
import axios from "../_snowpack/pkg/axios.js";
export const recipeRefresh = async (dispatch) => {
  const recipeDatas = await axios.get(`${SERVERURL}:${PORT}/allRecipe.do`);
  dispatch({type: "set_Recipe_Data", payload: recipeDatas.data});
  dispatch({type: "set_Display_Content", payload: "RecipeContents"});
};
