import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AuthData, StandardResponse, User } from '../interfaces/user.interface';
import {tap} from 'rxjs';
import { Router } from '@angular/router';

const USER_KEY = "current_user";
const TOKEN_KEY = "auth_token";

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #http = inject(HttpClient);
  #router = inject(Router);
  #baseUrl = 'http://localhost:3000/api/users';

  currentUser = signal<User | null | undefined>(this.#getStoredUser());
  isAuthenticated = computed(()=>!!this.currentUser());

  authEffect = effect(()=>{
    if(this.isAuthenticated()){
      this.#router.navigate(['/dashboard']);
    }
    else{
      this.#router.navigate(['/login']);
    }
  });

   login(credentials: { email: string, password: string }) {
    return this.#http.post<StandardResponse<AuthData>>(`${this.#baseUrl}/login`, credentials).pipe(
      tap(response => {
        const accessToken = response.data.accessToken;

        localStorage.setItem(TOKEN_KEY, accessToken);

        const user: User = { _id: 'temp_id', email: credentials.email };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  logout(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }

  register(credentials:{email:string, password:string}){
    return this.#http.post<{message:string}>(`${this.#baseUrl}/register`, credentials);
  }

  getToken():string|null{
    return localStorage.getItem(TOKEN_KEY);
  }

  #getStoredUser():User|null{
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user):null;
  }

  constructor() { }
}
