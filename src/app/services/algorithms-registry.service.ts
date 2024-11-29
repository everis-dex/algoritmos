import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAlgorithm, IFilterSearch } from '../interfaces/algorithms';
import { BehaviorSubject, Observable } from 'rxjs';
import { normalized } from '../shared/utilities';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmsRegistryService {
  public algorithms: IAlgorithm[] = [];

  private readonly _registryURL = environment.apiUrl;
  private readonly _currentAlgorithm$ = new BehaviorSubject<IAlgorithm>(
    {} as IAlgorithm
  );
  private readonly _algorithms$ = new BehaviorSubject<IAlgorithm[]>([]);
  private readonly _normalized = normalized;

  constructor(private readonly _http: HttpClient) {}

  /**
   * Loads the list of algorithms from the API.
   *
   * @return {Observable<IAlgorithm[]>} An observable containing the list of algorithms.
   * @memberof AlgorithmsRegistryService
   */
  public loadAlgorithms(): Observable<IAlgorithm[]> {
    const username = environment.basicAuth.username;
    const password = environment.basicAuth.password;
    const credentials = btoa(`${username}:${password}`);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      }),
      withCredentials: true,
    };
    return this._http.get<IAlgorithm[]>(this._registryURL, options);
  }

  /**
   * Sets the algorithms list and updates the observable.
   *
   * @param {IAlgorithm[]} algorithms The list of algorithms to set.
   * @memberof AlgorithmsRegistryService
   */
  public setAlgorithms(algorithms: IAlgorithm[]): void {
    this.algorithms = algorithms;
    this._algorithms$.next(algorithms);
  }

  /**
   * Sets the current algorithm and updates the observable.
   *
   * @param {IAlgorithm} algorithm The algorithm to set as the current one.
   * @memberof AlgorithmsRegistryService
   */
  public setCurrentAlgorithm(algorithm: IAlgorithm): void {
    this._currentAlgorithm$.next(algorithm);
  }

  /**
   * Returns the current algorithm as an observable.
   *
   * @return {Observable<IAlgorithm>} The current algorithm as an observable.
   * @memberof AlgorithmsRegistryService
   */
  public getCurrentAlgorithmSubject(): Observable<IAlgorithm> {
    return this._currentAlgorithm$.asObservable();
  }

  /**
   * Returns the list of algorithms as an observable.
   *
   * @return {Observable<IAlgorithm[]>} The list of algorithms as an observable.
   * @memberof AlgorithmsRegistryService
   */
  public getAlgorithmsSubject(): Observable<IAlgorithm[]> {
    return this._algorithms$.asObservable();
  }

  /**
   * Returns the list of algorithms.
   *
   * @return {IAlgorithm[]} The list of algorithms.
   * @memberof AlgorithmsRegistryService
   */
  public getAlgorithms(): IAlgorithm[] {
    return this.algorithms;
  }

  /**
   * Filters the algorithms based on the given search text.
   * Searches through the algorithm fields: 'nom', 'tema', 'estat', 'etiquetes', 'tipus_sistema'.
   *
   * @param {string} searchText The search text to filter algorithms.
   * @return {IAlgorithm[]} The filtered list of algorithms that match the search text.
   * @memberof AlgorithmsRegistryService
   */
  public onOpenSearch(searchText: string): IAlgorithm[] {
    const lowerSearchText = this._normalized(searchText);
    const keysToSearch = ['nom', 'tema', 'estat', 'etiquetes', 'tipus_sistema'];
    return this.algorithms.filter((item) =>
      keysToSearch.some(
        (key) =>
          key in item &&
          typeof item[key as keyof IAlgorithm] === 'string' &&
          this._normalized(item[key as keyof IAlgorithm]?.toString()).includes(
            lowerSearchText
          )
      )
    );
  }

  /**
   * Filters the algorithms based on the provided filters.
   * The filters are applied to the fields: 'estat', 'tema', 'etiquetes', and 'tipus_sistema'.
   *
   * @param {IFilterSearch} filters The filters to apply to the algorithm search.
   * @return {IAlgorithm[]} The filtered list of algorithms that match the given filters.
   * @memberof AlgorithmsRegistryService
   */
  public onFiltersSearch(filters: IFilterSearch): IAlgorithm[] {
    const lowercasedFilters = {
      estat: this._normalized(filters.estat),
      tema: this._normalized(filters.tema),
      etiquetes: this._normalized(filters.etiquetes),
      tipus_sistema: this._normalized(filters.tipus_sistema),
    };
    return this.algorithms.filter((item) => {
      const matchesTema = lowercasedFilters.tema
        ? this._normalized(item.tema).includes(lowercasedFilters.tema)
        : true;
      const matchesEstat = lowercasedFilters.estat
        ? this._normalized(item.estat).includes(lowercasedFilters.estat)
        : true;
      const matchesEtiquetes = lowercasedFilters.etiquetes
        ? this._normalized(item.etiquetes).includes(lowercasedFilters.etiquetes)
        : true;
      const matchesTipusSistema = lowercasedFilters.tipus_sistema
        ? this._normalized(item.tipus_sistema).includes(
            lowercasedFilters.tipus_sistema
          )
        : true;

      return (
        matchesTema && matchesEstat && matchesEtiquetes && matchesTipusSistema
      );
    });
  }

  /**
   * Returns a unique list of tags from the algorithms.
   * The labels are extracted from the 'etiquetes' field and split by commas.
   *
   * @return {string[]} A list of unique algorithm tags.
   * @memberof AlgorithmsRegistryService
   */
  public getAlgorithmTagList(): string[] {
    const splitEntries = this.algorithms
      .map((algorithm) => algorithm.etiquetes)
      .flat()
      .filter((entry) => entry.includes(','))
      .flatMap((entry) => entry.split(','));
    const cleanEntries = splitEntries.filter((entry) => !entry.includes(','));
    const result = Array.from(new Set([...splitEntries, ...cleanEntries]));

    return result;
  }
}
