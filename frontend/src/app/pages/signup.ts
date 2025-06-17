import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { Title } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

//Custom validator to check if passwords match
export const passwordMatchValidator: ValidatorFn = (control:AbstractControl):ValidationErrors|null=>{
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password && confirmPassword && password!==confirmPassword 
    ? {passwordsMismatch:true} 
    : null;
}

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
 template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="app-title">EduAdvisor AI</h1>
        
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
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
              <input id="password" formControlName="password" type="password" placeholder="Create a password">
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="input-wrapper">
               <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 11.25V8.25C8.25 6.25736 9.92421 4.5 12 4.5C14.0758 4.5 15.75 6.25736 15.75 8.25V11.25M6 11.25H18V21H6V11.25Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              <input id="confirmPassword" formControlName="confirmPassword" type="password" placeholder="Confirm your password">
            </div>
             @if(signupForm.get('confirmPassword')?.touched && signupForm.hasError('passwordsMismatch')) {
                <p class="error-text">Passwords do not match</p>
              }
          </div>

          <button class="submit-button" type="submit" [disabled]="!signupForm.valid">
            Sign Up
          </button>
        </form>
        
        <p class="auth-link">
          Already have an account? <a routerLink="/login">Login</a>
        </p>
      </div>

      <div class="footer-credit">
        Developed by Rustem Garr
      </div>
    </div>
  `,
  styles: [`
    @import '../styles/auth.styles.css';
    `]
})
export class Signup {
  #fb = inject(FormBuilder);
  #authService = inject(Auth);
  #router=inject(Router);
  #titleService = inject(Title);

  signupForm = this.#fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },{
    validators: passwordMatchValidator
  });

  onSubmit(){
    if (this.signupForm.valid){
      const {email, password} = this.signupForm.value;
      if(email && password){
        this.#authService.register({email, password}).subscribe({
          next:()=>{
            console.log("Registration successfull");
            this.#router.navigate(['/login']);
          },
          error:(err)=>{
            console.error("Registration failed", err);
          }
        })
      }
    }
  }
  constructor() {
    this.#titleService.setTitle('Signup - EduAdvisor AI');
  }
}
