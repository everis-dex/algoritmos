import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IAlgorithm } from './interfaces/algorithms';
import { AlgorithmsRegistryService } from './services/algorithms-registry.service';
import { take } from 'rxjs';
import { ViewManagerService } from './services/view-manager.service';

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
    private readonly _viewManagerService: ViewManagerService
  ) {}

  ngOnInit(): void {
    this._getAlgorithms();
    this._changeView();
    this._setAlgorithmName();
  }

  private _getAlgorithms(): void {
    this._algorithmsRegistryService
      .loadAlgorithms()
      .pipe(take(1))
      .subscribe((data) => {
        this._algorithmsRegistryService.setAlgorithms(data);
      });
  }

  private _changeView(): void {
    this._viewManagerService.getView().subscribe((data) => {
      if (data) {
        this.currentView = data;
      } else {
        this.currentView = 'home';
      }
    });
  }

  private _setAlgorithmName(): void {
    this._algorithmsRegistryService
      .getAlgorithmSubject()
      .subscribe((data) => (this.algorithm = data));
  }
}
