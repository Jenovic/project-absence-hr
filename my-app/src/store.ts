import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { brighthrApi } from "./services/brighthrApi";

export const store = configureStore({
    reducer: {
        [brighthrApi.reducerPath]: brighthrApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(brighthrApi.middleware),
});

setupListeners(store.dispatch);