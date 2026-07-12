import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../types/auth";

interface AuthState {
    user : AuthUser | null;
    isAuthenticated: boolean;
}
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearAuthUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;