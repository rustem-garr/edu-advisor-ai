import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs';
import { StandardResponse } from '../interfaces/user.interface';
import { Roadmap, CreateRoadmapPayload } from '../interfaces/roadmap.interface';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  #http = inject(HttpClient);
  #baseUrl = 'http://localhost:3000/api/users/me/roadmaps';

  createRoadmap(payload:CreateRoadmapPayload){
    return this.#http.post<StandardResponse<Roadmap>>(this.#baseUrl, payload).pipe(
      map(response=>response.data)
    )
  }

  getRoadmaps(){
    return this.#http.get<StandardResponse<Roadmap[]>>(this.#baseUrl).pipe(
      map(response => response.data)
    );
  }

  deleteRoadmap(id:string){
    return this.#http.delete<StandardResponse<{message:string}>>(`${this.#baseUrl}/${id}`);
  }

  constructor() { }
}
