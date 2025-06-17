import { Component, inject, OnInit, signal } from '@angular/core';
import {Auth} from '../services/auth';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap.interface';
import { Title } from '@angular/platform-browser'; 

import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule, 
    MatIconModule, RouterLink],
  template: `
    <div class="dashboard-header">
      <div>
        <p class="subtitle">Dashboard - manage your learning roadmaps</p>
      </div>
      <div class="actions">
        <button mat-flat-button color="primary" routerLink="/roadmaps/create">Create New Roadmap</button>
        <button mat-button (click)="authService.logout()">Logout</button>
      </div>
    </div>

    <h2>My Roadmaps</h2>
    @if (roadmaps().length > 0) {
      <div class="roadmap-grid">
        @for (roadmap of roadmaps(); track roadmap._id) {
          <mat-card class="roadmap-card" [routerLink]="['/roadmaps', roadmap._id.toString()]">
            <mat-card-header>
              <mat-card-title style="color:blue">{{ roadmap.topic }}</mat-card-title>
              <mat-card-subtitle>
                Level: {{ roadmap.userInput.experienceLevel }} | Style: {{ roadmap.userInput.learningStyle }}
              </mat-card-subtitle>
            </mat-card-header>
            
             <button mat-icon-button (click)="onDelete($event, roadmap._id.toString())" aria-label="Delete roadmap">
                    <mat-icon>delete</mat-icon>
              </button>
          </mat-card>
        }
      </div>
    } @else {
      <p class="no-roadmaps-message">You haven't created any roadmaps yet. Click "Create New Roadmap" to get started!</p>
    }
  `,
 
  styles: [`
   @import '../styles/dashboard.style.css';
  `]
})
export class Dashboard {
  authService = inject(Auth);
  #roadmapService = inject(RoadmapService);
  #titleService = inject(Title);

  roadmaps = signal<Roadmap[]>([]);

  ngOnInit():void{
    this.#titleService.setTitle('EduAdvisor AI - Dashboard')
    this.loadRoadmaps();
  }

  loadRoadmaps():void{
    this.#roadmapService.getRoadmaps().subscribe({
      next:(roadmaps)=>{
        this.roadmaps.set(roadmaps);
        console.log("Roadmaps loaded", roadmaps);
      },
      error: (err)=>{
        console.error('Failed to load roadmaps', err);
      }
    })
  }

  onDelete(event:MouseEvent, id:string):void{
    event.stopPropagation();
    if(confirm('Are you sure you want to delete this roadmap?')){
      this.#roadmapService.deleteRoadmap(id).subscribe({
        next: ()=>{
          this.roadmaps.update(currentRoadmaps=>
            currentRoadmaps.filter(r=>r._id.toString()!==id)
          );
          console.log("Roadmap deleted successfully");
        },
        error: (err)=> console.error("Failed to delete roadmap", err)
      });
    }
  }
}
