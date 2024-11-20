import { AfterViewChecked, Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { AlgorithmicSystemCard } from './interfaces/cards';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';

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

  constructor(private readonly _translationService: TranslationService) {}

  ngAfterViewChecked(): void {
    if (!this._isLiteralsLoaded) {
      const storedLiterals = JSON.parse(
        sessionStorage.getItem('literals') ?? '{}'
      );
      if (Object.keys(storedLiterals).length > 0) {
        this._translationService.translateLiterals(storedLiterals);
        this._isLiteralsLoaded = true;
      }
    }
  }

  public changeView(view?: string): void {
    this.currentView = view ?? 'home';
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this.algorithmicSystemDetails = details;
  }
}
