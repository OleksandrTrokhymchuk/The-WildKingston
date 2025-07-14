import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAnimalInfo = createAsyncThunk(
    "animalRandomFactSlice/fetchAnimalInfo",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch("https://catfact.ninja/fact")

            if(!response.ok) {
                throw new Error("Server error")
            }

            const data = await response.json()

            dispatch(handleAnimalInfo(data))
            console.log(data)
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = "rejected"
    state.error = action.payload
}

const animalRandomFactSlice = createSlice({
    name: "animalRandomFactSlice",
    initialState: {
        animalInfo: null,

        status: null,
        error: null,
    },
    reducers: {
        handleAnimalInfo: (state, action) => {
            state.animalInfo = action.payload.fact
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimalInfo.pending, (state) => {
              state.status = "loading"
              state.error = null
            })
            .addCase(fetchAnimalInfo.fulfilled, (state) => {
              state.status = "resolved"
            })
            .addCase(fetchAnimalInfo.rejected, setError)
    }
})

const { handleAnimalInfo } = animalRandomFactSlice.actions

export default animalRandomFactSlice.reducer