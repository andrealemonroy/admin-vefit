import { createSlice } from '@reduxjs/toolkit'
const initialState = { message: "", variant: null, withIcon: true }

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        show(state, action) {
            state.message = action?.payload?.message;
            state.variant = action?.payload?.variant;
            state.withIcon = !!action?.payload?.withIcon;
        },
        hide(state) {
            state.message = initialState.message;
            state.variant = initialState.variant;
            state.withIcon = initialState.withIcon;
        }
    },
})

export const { show, hide } = toastSlice.actions
export default toastSlice.reducer