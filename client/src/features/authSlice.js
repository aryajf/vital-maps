import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, {rejectWithValue}) => {
    try {
        const response = await axios.post('login', {
            email: user.email,
            password: user.password
        })
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.message
            return rejectWithValue(message)
        }
    }
})

export const getMe = createAsyncThunk("user/getMe", async(_, {rejectWithValue}) => {
    try {
        const response = await axios.get('profile')
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.message
            return rejectWithValue(message)
        }
    }
})

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    localStorage.removeItem("vitaltoken")
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = ""
        },
        initState: (state) => initialState
    },
    extraReducers: (builder) => {
        // LoginUser
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            localStorage.setItem("vitaltoken", action.payload.token)
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // Get User
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset, initState} = authSlice.actions
export default authSlice.reducer