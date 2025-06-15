import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthResponse, User } from '../interfaces/user.interface';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #http = inject(HttpClient);
  #baseUrl = 'http://localhost:3000/api/users';

  currentUser = signal<User | null | undefined>(undefined);
  isAuthenticated = computed(()=>!this.currentUser());

  login(credentials: {email:string, password:string}){
    return this.#http.post<AuthResponse>(`${this.#baseUrl}/login`, credentials).pipe(
      tap(response=>{
        console.log('Access token:', response.accessToken);
      })
    )
  }

  register(credentials:{email:string, password:string}){
    return this.#http.post<{message:string}>(`${this.#baseUrl}/register`, credentials);
  }

  constructor() { }
}
