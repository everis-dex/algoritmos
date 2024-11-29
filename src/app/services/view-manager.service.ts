import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewManagerService {
  private readonly _view$ = new BehaviorSubject<string>('');

  public setView(view: string): void {
    this._view$.next(view);
  }

  public getView(): Observable<string> {
    return this._view$.asObservable();
  }
}
