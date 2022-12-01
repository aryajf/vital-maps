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
        const response = await axios.get('hospital')
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.message
            return rejectWithValue(message)
        }
    }
})

export const getHospital = createAsyncThunk("map/getHospital", async(slug, {rejectWithValue}) => {
    try {
        const response = await axios.get(`hospital/${slug}`)
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.message
            return rejectWithValue(message)
        }
    }
})

export const createHospital = createAsyncThunk("map/createHospital", async(data, {rejectWithValue}) => {
    try {
        const response = await axios.post('hospital', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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

        // Get Hospital
        builder.addCase(getHospital.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getHospital.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.hospital = action.payload.hospital
        })
        builder.addCase(getHospital.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // Create Hospital
        builder.addCase(createHospital.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createHospital.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            notyf.error('Berhasil menambah data')
        })
        builder.addCase(createHospital.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            notyf.error('Gagal menambah data')
        })
    }
})

export const {reset} = mapSlice.actions
export default mapSlice.reducer