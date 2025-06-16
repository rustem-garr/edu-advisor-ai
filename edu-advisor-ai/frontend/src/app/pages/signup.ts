import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

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
     <div class="container">
      <mat-card>
        <mat-card-title>Sign Up</mat-card-title>
        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" placeholder="Enter your password">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput formControlName="confirmPassword" type="password" placeholder="Confirm your password">
              @if(signupForm.hasError('passwordsMismatch')) {
                <mat-error>Passwords do not match</mat-error>
              }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!signupForm.valid">
              Sign Up
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions align="end">
            <a routerLink="/login">Already have an account? Login</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: ``
})
export class Signup {
  #fb = inject(FormBuilder);
  #authService = inject(Auth);
  #router=inject(Router);

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
}
