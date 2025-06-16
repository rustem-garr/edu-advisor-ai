import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../services/auth';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-title>Login</mat-card-title>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input type="email" matInput formControlName = "email" placeholder="Enter your email">
              @if(loginForm.get('email')?.hasError('required')){
                <mat-error>Email is required</mat-error>
              }
              @if(loginForm.get('email')?.hasError('email')){
                <mat-error>Please enter a valid email</mat-error>
              }
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input type="password" matInput formControlName = "password" placeholder="Enter your password">
              @if(loginForm.get('password')?.hasError('required')){
                <mat-error>Password is required</mat-error>
              }
            </mat-form-field>
            
            <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">Login</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    mat-card {
      width: 100%;
      max-width: 400px;
    }
    mat-form-field {
      width: 100%;
    }
    button {
      width: 100%;
    }
    `]
})
export class Login {
  #fb = inject(FormBuilder);
  #authService = inject(Auth);

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
          console.log('Login successful', response)
        },
        error:(err)=>{
          console.error("Login failed",err);
        }
      })
    }
  }
}
