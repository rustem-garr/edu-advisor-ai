import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap.interface';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-roadmap-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule
  ],
  template: `
   <div class="detail-container">
      @if (roadmap()) {
        <mat-card>
          <mat-card-header>
              <mat-card-title style="color:blue">{{ roadmap()?.topic }}</mat-card-title>
              <mat-card-subtitle>
                Level: {{ roadmap()?.userInput?.experienceLevel }} | 
                Style: {{ roadmap()?.userInput?.learningStyle }}
              </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            @if (isLoading()) {
              <div class="loading-container">
                <p>EduAdvisor AI is generating your personalized roadmap...</p>
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
              </div>
            }

            @if (hasSteps()) {
              <mat-list role="list">
                @for (step of roadmap()?.steps; track step._id) {
                  <mat-list-item role="listitem" class="step-item">
                    <mat-checkbox matListItemAvatar class="step-checkbox" [checked]="step.isCompleted">
                    </mat-checkbox>
                    <div matListItemTitle class="step-title">{{ step.stepNumber }}. {{ step.title }}</div>
                    <div matListItemLine class="step-description">{{ step.description }}</div>
                  </mat-list-item>
                }
              </mat-list>
            } @else if (!isLoading()) {
              <div class="generate-container">
                <p>This roadmap is empty. Let's create your learning path!</p>
                <button mat-raised-button color="primary" (click)="onGenerateSteps()">
                  <mat-icon>auto_awesome</mat-icon>
                  Generate Steps with AI
                </button>
              </div>
            }
          </mat-card-content>
        </mat-card>
      } @else if (!isLoading()) {
        <p>Loading roadmap details...</p>
      }
    </div>
  `,
  styles: [`
    @import '../styles/roadmap-detail.style.css';
  `]
})
export class RoadmapDetail implements OnInit {
  @Input() id!: string;

  private roadmapService = inject(RoadmapService);

  roadmap = signal<Roadmap | null>(null);
  isLoading = signal<boolean>(false);

  hasSteps = computed(() => (this.roadmap()?.steps?.length ?? 0) > 0);

  ngOnInit(): void {
    this.roadmapService.getRoadmapById(this.id).subscribe({
      next: (data) => this.roadmap.set(data)
    });
  }

  onGenerateSteps(): void {
    this.isLoading.set(true);
    this.roadmapService.generateSteps(this.id).subscribe({
      next: (updatedRoadmap) => {
        this.roadmap.set(updatedRoadmap); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Failed to generate steps", err);
        this.isLoading.set(false);
      }
    });
  }
}