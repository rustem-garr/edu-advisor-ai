import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoadmapService } from '../services/roadmap-service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-roadmap-create',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule],
  template: `
    <div class="create-container">
      <mat-card>
        <h2 style="text-align:center; color:blue">Tell AI what you want to learn...</h2>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>What do you want to master?</mat-label>
              <input matInput formControlName="topic" placeholder="e.g., Learn Python for Data Science">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Your Current Experience Level</mat-label>
              <mat-select formControlName="experienceLevel">
                <mat-option value="Beginner">Beginner</mat-option>
                <mat-option value="Intermediate">Intermediate</mat-option>
                <mat-option value="Advanced">Advanced</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Your Preferred Learning Style</mat-label>
              <mat-select formControlName="learningStyle">
                <mat-option value="Video Tutorials">Video Tutorials</mat-option>
                <mat-option value="Reading Official Docs">Reading Official Docs</mat-option>
                <mat-option value="Hands-on Projects">Hands-on Projects</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
              Create My Roadmap
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    @import '../styles/roadmap.style.css';
    `]
})
export class RoadmapCreate {
  #fb=inject(FormBuilder);
  router = inject(Router);
  #roadmapService = inject(RoadmapService);

  form = this.#fb.group({
    topic: ['', [Validators.required]],
    experienceLevel: ['', [Validators.required]],
    learningStyle: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.form.valid){
      const {topic, experienceLevel, learningStyle}=this.form.value;
      const payload = {
        topic:topic!,
        userInput:{
          experienceLevel: experienceLevel!,
          learningStyle: learningStyle!
        }
      };

      this.#roadmapService.createRoadmap(payload).subscribe({
        next: (newRoadmap) => {
          console.log("Roadmap created", newRoadmap);
          this.router.navigate(['/roadmaps', newRoadmap._id]);
        },
        error: (err) => console.error("Failed to create roadmap", err)
      });
    }
  }
}
