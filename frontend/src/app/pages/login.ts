import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
    template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="app-title">EduAdvisor AI</h1>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 4.5H22.5V19.5H1.5V4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M1.5 4.5L12 12.75L22.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              <input id="email" formControlName="email" type="email" placeholder="you@example.com">
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 11.25V8.25C8.25 6.25736 9.92421 4.5 12 4.5C14.0758 4.5 15.75 6.25736 15.75 8.25V11.25M6 11.25H18V21H6V11.25Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              <input id="password" formControlName="password" type="password" placeholder="********">
            </div>
          </div>

          <button class="submit-button" type="submit" [disabled]="!loginForm.valid">
            Login
          </button>
        </form>
        
        <p class="auth-link">
          Don't have an account? <a routerLink="/signup">Sign Up</a>
        </p>
      </div>

      <div class="footer-credit">
        &copy; Developed by Rustem Garr 
      </div>
    </div>
  `,
  styles: [`
  @import '../styles/auth.styles.css';
  `]
  
})
export class Login {
  #fb = inject(FormBuilder);
  #authService = inject(Auth);
  #titleService = inject(Title);
  #router = inject(Router);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(){
    if(this.loginForm.valid){
      const credentials = {
        email:this.loginForm.value.email!,
        password:this.loginForm.value.password!
      }
      this.#authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.#router.navigate(['/dashboard'])
        },
        error:(err)=>{
          console.error("Login failed",err);
        }
      })
    }
  }

  constructor() {
    this.#titleService.setTitle('Login - EduAdvisor AI');
  }
}
