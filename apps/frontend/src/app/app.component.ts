import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { Store } from '@ngrx/store';
import { logout } from './auth/auth.actions';

@Component({
  imports: [LoginComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.checkTokenValidity();

    
    setInterval(() => {
      this.checkTokenValidity();
    }, 60 * 1000);
  }

  checkTokenValidity() {
    const expiry = localStorage.getItem('token_expiry');
    if (expiry) {
      const now = new Date().getTime();
      if (now >= +expiry) {
        this.store.dispatch(logout());
      }
    }
  }
}