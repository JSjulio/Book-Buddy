import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

//All reducers are combined in root reducer so you don't need to make any change to the sotry
export const store = configureStore ({
    reducer: rootReducer,
})