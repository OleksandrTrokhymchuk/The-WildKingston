import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice"
import animalRandomFactSlice from "./animalRandomFactSlice"
import animalNewsSlice from "./animalNewsSlice"

export const store = configureStore({
    reducer: {
        productsSlice: productsSlice,
        animalRandomFactSlice: animalRandomFactSlice,
        animalNewsSlice: animalNewsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch