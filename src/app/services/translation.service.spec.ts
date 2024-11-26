import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideTranslateService()],
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fallback to Angular translation when external translation fails', () => {
    const translateTextSpy = spyOn(service, 'translateText').and.returnValue(
      throwError(() => 'Error al traducir: 500 error message')
    );

    const literals = { key1: 'value1', key2: 'value2' };
    service.translateLiterals(literals);

    expect(translateTextSpy).toHaveBeenCalledWith('value1|value2', 'es');
    expect(service.translatedLiterals['key1']).toBe('key1');
    expect(service.translatedLiterals['key2']).toBe('key2');
  });
});
