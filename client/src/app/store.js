import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import mapReducer from '../features/mapSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        map: mapReducer
    },
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()