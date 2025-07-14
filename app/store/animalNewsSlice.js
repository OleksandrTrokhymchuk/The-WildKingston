import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAnimalNews = createAsyncThunk(
    "animalRandomFactSlice/fetchAnimalNews",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch("https://newsapi.org/v2/everything?q=pets&apiKey=33c8966d88354f28ba1bb13a64865c81")

            if(!response.ok) {
                throw new Error("Server error")
            }

            const data = await response.json()

            dispatch(handleAnimalNews(data))
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

const animalNewsSlice = createSlice({
    name: "animalNewsSlice",
    initialState: {
        animalNewsInfo: null,

        status: null,
        error: null,
    },
    reducers: {
        handleAnimalNews: (state, action) => {
            state.animalNewsInfo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimalNews.pending, (state) => {
              state.status = "loading"
              state.error = null
            })
            .addCase(fetchAnimalNews.fulfilled, (state) => {
              state.status = "resolved"
            })
            .addCase(fetchAnimalNews.rejected, setError)
    }
})

const { handleAnimalNews } = animalNewsSlice.actions

export default animalNewsSlice.reducer