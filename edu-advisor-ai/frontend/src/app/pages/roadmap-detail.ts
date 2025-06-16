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
    <div class="container">
      @if (roadmap()) {
        <mat-card>
          <mat-card-title>{{ roadmap()?.topic }}</mat-card-title>
          <mat-card-subtitle>
            Level: {{ roadmap()?.userInput?.experienceLevel }} | 
            Style: {{ roadmap()?.userInput?.learningStyle }}
          </mat-card-subtitle>

          <mat-card-content>
            <h3>Learning Steps</h3>
            @if (hasSteps()) {
              <mat-list>
                @for (step of roadmap()?.steps; track step._id) {
                  <mat-list-item>
                    <mat-checkbox matListItemAvatar class="step-checkbox"></mat-checkbox>
                    <span matListItemTitle>{{ step.stepNumber }}. {{ step.title }}</span>
                    <span matListItemLine>{{ step.description }}</span>
                  </mat-list-item>
                }
              </mat-list>
            } @else {
              <p>This roadmap has no steps yet.</p>
              @if (!isLoading()) {
                <button mat-raised-button color="primary" (click)="onGenerateSteps()">
                  Generate Steps with AI
                </button>
              }
            }

            @if (isLoading()) {
              <p>EduAdvisor AI is thinking...</p>
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            }
          </mat-card-content>
        </mat-card>
      } @else {
        <p>Loading roadmap...</p>
      }
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    .step-checkbox { margin-right: 16px; }
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