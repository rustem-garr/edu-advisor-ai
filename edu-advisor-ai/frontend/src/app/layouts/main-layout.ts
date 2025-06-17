import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="main-header">
      <div class="header-content">
        <a class="header-title" routerLink="/dashboard">EduAdvisor AI</a>
      </div>
    </header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <div class="footer-credit">
      &copy; Developed by Rustem Garr
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #f4f7fa;
      position: relative;
    }
    .main-header {
      background: white;
      padding: 0 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
    }
    .header-content {
      display: flex;
      align-items: center;
      height: 64px;
    }
    .header-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
      text-decoration: none;
    }
    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      padding-bottom:5rem;
    }
   .footer-credit {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      color: #667eea;
      background-color:white;
      padding:1rem 0 1.2rem 0;
      font-size: 0.875rem;
      border-top:0.5px solid #667eea;
    }
  `]
})
export class MainLayoutComponent {}