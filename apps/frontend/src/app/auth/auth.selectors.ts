import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
export const selectSignupMessage = createSelector(
  selectAuthState,
  (state) => state.message
);
export const selectAuthMessage = createSelector(
  selectAuthState,
  (state) => state.message
);
