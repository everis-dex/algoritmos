import { Injectable } from '@angular/core';
import { AlgorithmicSystemCard } from '../interfaces/algorithmicSystems';
import { Observable, of } from 'rxjs';
import { mockAlgorithmicSystems } from '../mocks/algorithmic-systems';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmicSystemService {
  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  public getAlgorithmicSystems(): Observable<AlgorithmicSystemCard[]> {
    mockAlgorithmicSystems.forEach((algorithmicSystem) => {
      this.algorithmicSystems.push(algorithmicSystem);
    });
    return of(this.algorithmicSystems);
  }
}
