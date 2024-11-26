import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public translatedLiterals: Record<string, string> = {};

  private readonly _apiUrl =
    'https://translate.googleapis.com/translate_a/single';
  private readonly _literalsTranslations: string[] = [];

  constructor(
    private readonly _http: HttpClient,
    private readonly _translateService: TranslateService
  ) {}

  public translateText(
    text: string,
    targetLang: string,
    extractedLiterals?: Record<string, string>[]
  ): Observable<string> {
    const params = new HttpParams()
      .set('client', 'gtx')
      .set('sl', 'ca')
      .set('tl', targetLang)
      .set('dt', 't')
      .set('q', text);

    return this._http.get<string[]>(this._apiUrl, { params }).pipe(
      catchError(() => {
        extractedLiterals?.forEach((literal) => {
          this._translateService
            .get(literal['key'])
            .subscribe((translation) =>
              this._literalsTranslations.push(translation)
            );
        });
        return this._literalsTranslations;
      }),
      map((response) => {
        if (Array.isArray(response[0])) {
          return response[0]
            .filter((fragment) => Array.isArray(fragment) && fragment[0])
            .map((fragment) => fragment[0])
            .join(' ');
        }
        return this._literalsTranslations.join('|');
      })
    );
  }

  public loadLiterals(): Observable<Record<string, unknown>> {
    const path = 'assets/i18n/ca.json';
    return this._http.get<Record<string, unknown>>(path);
  }

  private _extractLiterals(
    literals: Record<string, unknown>,
    parentKey = ''
  ): { key: string; value: string }[] {
    let literalsList: { key: string; value: string }[] = [];
    for (const key in literals) {
      const value = literals[key];
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'string') {
        literalsList.push({ key: currentKey, value });
      } else if (typeof value === 'object' && value !== null) {
        literalsList = literalsList.concat(
          this._extractLiterals(value as Record<string, unknown>, currentKey)
        );
      }
    }
    return literalsList;
  }

  public getTranslatedLiterals(): Record<string, string> {
    return this.translatedLiterals;
  }

  public translateLiterals(literals: Record<string, unknown>): void {
    const extractedLiterals = this._extractLiterals(literals);
    const literalsToTranslate = extractedLiterals.map(
      (literal) => literal.value
    );
    this.translateText(
      literalsToTranslate.join('|'),
      'es',
      extractedLiterals
    ).subscribe((translatedText) => {
      const translatedTextsArray = translatedText.split('|');
      extractedLiterals.forEach((literal, index) => {
        this.translatedLiterals[literal.key] =
          translatedTextsArray[index]?.trim();
      });
    });
  }
}
