import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../../api/bookApi";

//All reducers are combined in root reducer so you don't need to make any change to the sotry
export const store = configureStore ({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
    },
    middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware().concat(bookApi.middleware),
});