import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { AlgorithmicSystemCard } from './interfaces/cards';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { SessionStorageService } from './services/session-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    SystemsSearcherComponent,
    SystemDetailComponent,
    BannerComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked {
  public currentView = 'home';
  public algorithmicSystemDetails: AlgorithmicSystemCard = {
    id: 0,
    state: '',
    title: '',
    description: '',
    categoryChips: [],
  };

  private _isLiteralsLoaded = false;

  constructor(
    private readonly _translationService: TranslationService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _sessionStorageService: SessionStorageService
  ) {}

  ngAfterViewChecked(): void {
    this._translateLiterals();
  }

  public changeView(view?: string): void {
    this._isLiteralsLoaded = false;
    this.currentView = view ?? 'home';
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this.algorithmicSystemDetails = details;
  }

  private _translateLiterals(): void {
    if (!this._isLiteralsLoaded) {
      const storedLiterals =
        this._sessionStorageService.getItem<Record<string, string>>('literals');
      if (storedLiterals && Object.keys(storedLiterals).length > 0) {
        this._translationService.translateLiterals(storedLiterals);
        this._isLiteralsLoaded = true;
      }
    }
  }

  public manageLiterals(): void {
    this._isLiteralsLoaded = false;
    this._cdr.detectChanges();
  }
}
