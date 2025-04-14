import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, signupSuccess, signupFailure, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: any;
  message:  null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  message:  null,
};

export const authReducer = createReducer(
  initialState,

  // عند نجاح تسجيل الدخول
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
    
  })),

  // في حال فشل تسجيل الدخول
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(signupSuccess, (state, { message }) => ({
    ...state,
    message:null,
    error: null,
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(logout, state => ({
    ...state,
    token: null,
    error: null,
    message: null
  }))
  

);


