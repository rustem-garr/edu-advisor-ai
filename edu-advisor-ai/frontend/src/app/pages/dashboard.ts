import { Component, inject } from '@angular/core';
import {Auth} from '../services/auth';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule],
  template: `
    <h1>Welcome to Your Dashboard!</h1>
    <p>This is a protected area.</p>
    <button mat-raised-button color="warn" (click)="authService.logout()">
      Logout
    </button>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
  `]
})
export class Dashboard {
  authService = inject(Auth);
}
