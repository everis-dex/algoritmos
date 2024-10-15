import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }
}
