import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs';
import { StandardResponse } from '../interfaces/user.interface';
import { Roadmap } from '../interfaces/roadmap.interface';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  #http = inject(HttpClient);
  #baseUrl = 'http://localhost:3000/api/users/me/roadmaps';

  getRoadmaps(){
    return this.#http.get<StandardResponse<Roadmap[]>>(this.#baseUrl).pipe(
      map(response => response.data)
    );
  }

  constructor() { }
}
