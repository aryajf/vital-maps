import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    hospitals: [],
    hospital: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getHospitals = createAsyncThunk("map/getHospitals", async(_, {rejectWithValue}) => {
    try {
        const response = await axios.get('http://localhost:3000/hospital')
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.message
            return rejectWithValue(message)
        }
    }
})

export const mapSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Get Hospitals
        builder.addCase(getHospitals.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getHospitals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.hospitals = action.payload.hospitals
        })
        builder.addCase(getHospitals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = mapSlice.actions
export default mapSlice.reducer