import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string ; expiresIn: number}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);



export const signup = createAction(
  '[Auth] Signup',
  props<{ firstName: string; lastName: string; email: string; password: string }>()
);


export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ message: string }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);



export const logout = createAction('[Auth] Logout');

