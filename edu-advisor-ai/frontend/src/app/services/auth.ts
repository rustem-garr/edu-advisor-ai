import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AuthResponse, User } from '../interfaces/user.interface';
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

  login(credentials: Partial<{email:string, password:string}>){
    return this.#http.post<AuthResponse>(`${this.#baseUrl}/login`, credentials).pipe(
      tap(response=>{
        localStorage.setItem(TOKEN_KEY, response.accessToken);
        const user: User = {_id: 'temp_id', email: credentials.email!};
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUser.set(user);
      })
    )
  }

  logout(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }

  register(credentials:Partial<{email:string, password:string}>){
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
