import { Component, inject, OnInit, signal } from '@angular/core';
import {Auth} from '../services/auth';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap.interface';

import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule],
  template: `
   <div class="container">
      <mat-card>
        <mat-card-title>Your Dashboard</mat-card-title>
        <mat-card-subtitle>Manage your learning roadmaps</mat-card-subtitle>

        <mat-card-actions>
          <button mat-flat-button color="primary">Create New Roadmap</button>
          <button mat-button color="warn" (click)="authService.logout()">Logout</button>
        </mat-card-actions>

        <mat-card-content>
          <h2>My Roadmaps</h2>
          @if (roadmaps().length > 0) {
            <mat-list role="list">
              @for (roadmap of roadmaps(); track roadmap._id) {
                <mat-list-item role="listitem">
                  <span matListItemTitle>{{ roadmap.topic }}</span>
                  <span matListItemLine>Level: {{ roadmap.userInput.experienceLevel }}</span>
                  <span matListItemLine>Style: {{ roadmap.userInput.learningStyle }}</span>
                
                  <button mat-icon-button (click)="onDelete(roadmap._id.toString())" aria-label="Delete roadmap">
                    <mat-icon>delete</mat-icon>
                  </button>
                
                </mat-list-item>
              }
            </mat-list>
          } @else {
            <p>You haven't created any roadmaps yet. Get started!</p>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    mat-card-actions { margin-bottom: 1rem; }
  `]
})
export class Dashboard {
  authService = inject(Auth);
  #roadmapService = inject(RoadmapService);

  roadmaps = signal<Roadmap[]>([]);

  ngOnInit():void{
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

  onDelete(id:string):void{
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
