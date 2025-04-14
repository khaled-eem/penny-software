import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, interval, map, mergeMap, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.http.post<{ token: string ;expires_in: number}>(`${environment.API_URL}/auth/login`, { email, password }).pipe(
          map(response => AuthActions.loginSuccess({ token: response.token , expiresIn: response.expires_in})),
          catchError(error => of(AuthActions.loginFailure({ error: error.message || 'Login failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({token, expiresIn}) => {
          const now = new Date().getTime();
          const expiry = now + expiresIn * 1000;
          localStorage.setItem('token', token);
          localStorage.setItem('token_expiry', expiry.toString());
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ firstName, lastName, email, password }) =>
        this.http.post<{ message: string }>(`${environment.API_URL}/auth/create/user`, {
          firstName, lastName, email, password
        }).pipe(
          map(response => AuthActions.signupSuccess({ message: response.message })),
          catchError(error => of(AuthActions.signupFailure({ error })))
        )
      )
    )
  );
  
  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap((action) => {
          console.log(' Signup success message:', action.message);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );




  
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiry');
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
  

}
