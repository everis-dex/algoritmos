import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './layout/banner/banner.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IAlgorithm } from './shared/interfaces/algorithms.model';
import { AlgorithmsRegistryService } from './services/algorithms-registry.service';
import { catchError, of, take } from 'rxjs';
import { ViewManagerService } from './services/view-manager.service';
import { SessionStorageService } from './services/session-storage.service';
import { mockAlgorithms } from './shared/mock/algorithms.mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    SystemsSearcherComponent,
    SystemDetailComponent,
    BannerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public currentView = '';
  public algorithm: IAlgorithm = {} as IAlgorithm;

  constructor(
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService,
    private readonly _viewManagerService: ViewManagerService,
    private readonly _sessionStorageService: SessionStorageService
  ) {
    this._algorithmsRegistryService
      .loadAlgorithms()
      .pipe(
        take(1),
        catchError(() => of(mockAlgorithms))
      )
      .subscribe((data) => {
        this._algorithmsRegistryService.setAlgorithms(data);
      });
  }

  ngOnInit(): void {
    this._changeView();
    this._setAlgorithmName();
    this._sessionStorageService.removeItem('popularCategorySelected');
    this._sessionStorageService.removeItem('lastSearch');
  }

  private _changeView(): void {
    this._viewManagerService.getView().subscribe((data) => {
      this.currentView = data || 'home';
    });
  }

  private _setAlgorithmName(): void {
    this._algorithmsRegistryService
      .getCurrentAlgorithmSubject()
      .subscribe((data) => (this.algorithm = data));
  }
}
