import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _translatedTexts: Record<string, string> = {};
  private _literals: Record<string, unknown> = {};
  private readonly _apiUrl =
    'https://translate.googleapis.com/translate_a/single';

  constructor(
    private readonly _http: HttpClient,
    private readonly _sessionStorageService: SessionStorageService
  ) {
    this._loadLiterals().subscribe((literals) => {
      this._literals = literals;
    });
  }

  private _translateText(text: string, targetLang: string): Observable<string> {
    const params = new HttpParams()
      .set('client', 'gtx')
      .set('sl', 'ca')
      .set('tl', targetLang)
      .set('dt', 't')
      .set('q', text);

    return this._http.get<string[]>(this._apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error al traducir:', error);
        return of(text);
      }),
      map((response) => {
        if (Array.isArray(response[0])) {
          return response[0]
            .filter((fragment) => Array.isArray(fragment) && fragment[0])
            .map((fragment) => fragment[0])
            .join(' ');
        }
        return text;
      })
    );
  }

  private _loadLiterals(): Observable<Record<string, unknown>> {
    const path = 'assets/i18n/ca.json';
    return this._http.get<Record<string, unknown>>(path);
  }

  public getLiteral(
    key: string,
    params?: Record<string, string | number>
  ): string | void {
    let result: unknown = this._literals;

    const keys = key.split('.');
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      }
    }
    if (typeof result === 'string') {
      if (params) return this._replaceParams(result, params);
      return result;
    }
  }

  private _replaceParams(
    text: string,
    params: Record<string, string | number>
  ): string {
    return Object.entries(params).reduce(
      (result, [key, value]) =>
        result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
      text
    );
  }

  public getTranslations(): Record<string, string> {
    return this._translatedTexts;
  }

  public saveLiterals(literals: Record<string, string>): void {
    const storedLiterals =
      this._sessionStorageService.getItem<Record<string, string>>('literals');
    for (const [key, value] of Object.entries(literals)) {
      if (storedLiterals && !storedLiterals[key]) {
        storedLiterals[key] = value;
      }
    }
    this._sessionStorageService.setItem('literals', storedLiterals);
  }

  public translateLiterals(literals: Record<string, string>): void {
    const literalsKeys = Object.keys(literals);
    const untranslatedKeys = literalsKeys.filter(
      (key) => !this._translatedTexts[key]
    );
    if (untranslatedKeys.length === 0) return;
    const untranslatedValues = untranslatedKeys.map((key) => literals[key]);
    this._translateText(untranslatedValues.join('|'), 'es').subscribe(
      (translatedText) => {
        const translatedTextsArray = translatedText.split('|');
        untranslatedKeys.forEach((key, index) => {
          this._translatedTexts[key] = translatedTextsArray[index];
        });
        sessionStorage.removeItem('literals');
      }
    );
  }
}
