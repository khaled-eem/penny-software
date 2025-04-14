import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signup } from '../auth/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthMessage } from '../auth/auth.selectors';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  error$: Observable<string | null> | undefined;
  message$: Observable<string | null> | undefined;

  
  constructor(private fb: FormBuilder, private store: Store) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.error$ = this.store.select(selectAuthError);
    this.message$ = this.store.select(selectAuthMessage);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      this.store.dispatch(signup({ firstName, lastName, email, password }));
    }
  }
}


