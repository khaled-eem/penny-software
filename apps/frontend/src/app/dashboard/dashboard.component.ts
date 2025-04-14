import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { logout } from '../auth/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
 

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit() {
    this.http.get<User[]>(`${environment.API_URL}/auth/users`)
      .subscribe(data => {
        this.users = data;
      });
  }
  onLogout() {
    this.store.dispatch(logout());
  }

}
