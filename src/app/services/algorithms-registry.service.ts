import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAlgorithm, IFilterSearch } from '../interfaces/algorithms';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { CATEGORIES } from '../constants/search-filters.const';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsRegistryService {

  public registryURL = environment.apiUrl
  public allAlgorithms: IAlgorithm[] = [];
  private allAlgorithmsSubject = new BehaviorSubject<IAlgorithm[] | null>(null);


  constructor(private http: HttpClient) {
    this.getAlgorithms().pipe(take(1)).subscribe((data) => {
      this.allAlgorithmsSubject.next(data);
      this.allAlgorithms = data;
    });
  }

  /**
   * Returns all algorithms as an observable
   *
   * @return {*}  {(Observable<IAlgorithm[] | null>)}
   * @memberof AlgorithmsRegistryService
   */
  getAllAlgorithmsSubject(): Observable<IAlgorithm[] | null> {
    return this.allAlgorithmsSubject.asObservable();
  }

  
  /**
   * Returns all algorithms as an array
   *
   * @return {*}  {Array<IAlgorithm>}
   * @memberof AlgorithmsRegistryService
   */
  getAllAlgorithms(): Array<IAlgorithm> {
    return this.allAlgorithms;
  }

  
  /**
   * Returns data from API
   *
   * @return {*}  {Observable<IAlgorithm[]>}
   * @memberof AlgorithmsRegistryService
   */
  getAlgorithms(): Observable<IAlgorithm[]> {
    const username = environment.basicAuth.username;
    const password = environment.basicAuth.password;
    const credentials = btoa(`${username}:${password}`);

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${credentials}`,
      }),
      withCredentials: true
    };
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
  onOpenSearch(searchText: string): Array<IAlgorithm> {
    const lowerSearchText = this.normalized(searchText);
    const keysToSearch = ['nom', 'tema', 'estat', 'etiquetes', 'tipus_sistema']; // todo define
    return this.allAlgorithms.filter((item) =>
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
  onFiltersSearch(filters: IFilterSearch): Array<IAlgorithm> {
    const lowercasedFilters = {
      estat:this.normalized( filters.estat),
      tema: this.normalized(filters.tema), // check varios temas
      etiquetes: this.normalized(filters.etiquetes), // check varias etiquetas
      tipus_sistema: this.normalized(filters.tipus_sistema),
    };
    return this.allAlgorithms.filter((item) => {
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

  
  /**
   * Returns the algorithm with the given name
   *
   * @param {string} name
   * @return {*}  {IAlgorithm}
   * @memberof AlgorithmsRegistryService
   */
  getAlgorthmByName(name: string): IAlgorithm { // ToDo change for ID when available
    if (!this.allAlgorithms) return {} as IAlgorithm;
    return this.allAlgorithms.find(algorithm => algorithm.nom === name) || {} as IAlgorithm;
  }


  /**
   * Retunrs the list of algorithms labels
   *
   * @return {*} 
   * @memberof AlgorithmsRegistryService
   */
  getAlgorithmsLabelsList() {
      const splitEntries = this.allAlgorithms.map(algorithm => algorithm.etiquetes).flat()
      .filter(entry => entry.includes(','))
      .flatMap(entry => entry.split(','));
      const cleanEntries = splitEntries.filter(entry => !entry.includes(','));
      const result = Array.from(new Set([...splitEntries, ...cleanEntries]));
    
      return result;
  }

  /**
   * Returns categories from constant
   *
   * @return {*} 
   * @memberof AlgorithmsRegistryService
   */
  getAlgorithmsCategoriesList() {
    return CATEGORIES;
  }


  /**
   * Returns a normalized string, removing accents and converting to lowercase
   *
   * @param {(string | undefined)} text
   * @return {*}  {string}
   * @memberof AlgorithmsRegistryService
   */
  normalized(text: string | undefined): string {
    if (!text) return '';
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
}
