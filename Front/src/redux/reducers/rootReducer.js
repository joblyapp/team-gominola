import { combineReducers } from "redux";
import { CategoriesReducer } from "./reducersCategoryes";
import { LoginReducer } from "./reducersLogin";
export const rootReducer = combineReducers(
    {
        categoriesState: CategoriesReducer,
        loginState: LoginReducer,
    }
)