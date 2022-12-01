import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    hospitals: [],
    hospital: null,
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

export const editHospital = createAsyncThunk("map/editHospital", async({slug, data}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`hospital/${slug}`, data, {
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

export const deleteHospital = createAsyncThunk("map/deleteHospital", async(slug, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`hospital/${slug}`)
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
        })
        builder.addCase(getHospitals.fulfilled, (state, action) => {
            state.hospitals = action.payload.hospitals
        })
        builder.addCase(getHospitals.rejected, (state, action) => {
            state.message = action.payload
        })

        // Get Hospital
        builder.addCase(getHospital.pending, (state) => {
        })
        builder.addCase(getHospital.fulfilled, (state, action) => {
            state.hospital = action.payload.hospital
        })
        builder.addCase(getHospital.rejected, (state, action) => {
            state.message = action.payload
        })

        // Create Hospital
        builder.addCase(createHospital.pending, (state) => {
        })
        builder.addCase(createHospital.fulfilled, (state, action) => {
            state.message = action.payload
            notyf.success(state.message)
        })
        builder.addCase(createHospital.rejected, (state, action) => {
            state.message = action.payload
            notyf.error(state.message)
        })

        // Update Hospital
        builder.addCase(editHospital.pending, (state) => {
        })
        builder.addCase(editHospital.fulfilled, (state, action) => {
            state.message = action.payload
            notyf.success(state.message)
        })
        builder.addCase(editHospital.rejected, (state, action) => {
            state.message = action.payload
            notyf.error(state.message)
        })

        // Delete Hospital
        builder.addCase(deleteHospital.pending, (state) => {
        })
        builder.addCase(deleteHospital.fulfilled, (state, action) => {
            state.message = action.payload
            notyf.success(state.message)
        })
        builder.addCase(deleteHospital.rejected, (state, action) => {
            state.message = action.payload
            notyf.error(state.message)
        })
    }
})

export const {reset} = mapSlice.actions
export default mapSlice.reducer