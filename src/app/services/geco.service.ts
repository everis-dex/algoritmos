import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class GecoService {
  public url = 'https://administraciodigital.gencat.cat/template?mode=html&code=OAD0001&idioma=ca&nocache';

  constructor(private http: HttpClient) {}

  
  public getGeco(): Observable<any> {
    return this.http.get<any>(this.url,{ responseType: 'text' as 'json' });
  }

}
