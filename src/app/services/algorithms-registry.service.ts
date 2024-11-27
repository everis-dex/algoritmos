import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAlgorithm, IFilterSearch } from '../interfaces/algorithms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsRegistryService {

  public registryURL = environment.apiUrl

  constructor(private http: HttpClient) { }

  public allAlgResults: Array<IAlgorithm> = [];

  
  getAlgorithms(): Observable<IAlgorithm[]> {
    const username = environment.basicAuth.username;
    const password = environment.basicAuth.password;
    const credentials = btoa(`${username}:${password}`);

    console.log('🚀 ~ credentials:', credentials)
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${credentials}`,
      }),
      withCredentials: true
    };
    console.log('🚀 ~ this.registryURL:', this.registryURL)
    return this.http.get<IAlgorithm[]>(this.registryURL, options);
    }

    
  /**
   * Returns an array of algorithms that match the given open search.
   *
   * @param {Array<IAlgorithm>} allResults
   * @param {string} searchText
   * @return {*}  {Array<IAlgorithm>}
   * @memberof AlgorithmsRegistryService
   */
  onOpenSearch(allResults: Array<IAlgorithm>, searchText: string): Array<IAlgorithm> {
    const lowerSearchText = this.normalized(searchText);
    const keysToSearch = ['nom', 'tema', 'estat', 'etiquetes', 'tipus_sistema']; // todo define
    return allResults.filter((item) =>
      keysToSearch.some((key) =>
        (key in item) && 
        typeof item[key as keyof IAlgorithm] === 'string' && 
        this.normalized(item[key as keyof IAlgorithm]?.toString()).includes(lowerSearchText)
      )
    );
  }

  /**
   * Returns an array of algorithms that match the given filters.
   *
   * @param {Array<IAlgorithm>} allResults
   * @param {IFilterSearch} filters
   * @return {*}  {Array<IAlgorithm>}
   * @memberof AlgorithmsRegistryService
   */
  onFiltersSearch(allResults: Array<IAlgorithm>, filters: IFilterSearch): Array<IAlgorithm> {
    const lowercasedFilters = {
      estat:this.normalized( filters.estat),
      tema: this.normalized(filters.tema),
      etiquetes: this.normalized(filters.etiquetes),
      tipus_sistema: this.normalized(filters.etiquetes),
    };
    return allResults.filter((item) => {
      const matchesTema = lowercasedFilters.tema
        ? this.normalized(item.tema).includes(lowercasedFilters.tema)
        : true;
      const matchesEstat = lowercasedFilters.estat
        ? this.normalized(item.estat).includes(lowercasedFilters.estat)
        : true;
      const matchesEtiquetes = lowercasedFilters.etiquetes
        ? this.normalized(item.etiquetes).includes(lowercasedFilters.etiquetes)
        : true;
      const matchesTipusSistema = lowercasedFilters.tipus_sistema
        ? this.normalized(item.tipus_sistema).includes(lowercasedFilters.tipus_sistema)
        : true;
      
      return matchesTema && matchesEstat && matchesEtiquetes && matchesTipusSistema;
    });
  }

  normalized(text: string | undefined): string {
    if (!text) return '';
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
}
