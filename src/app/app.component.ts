import { AfterViewChecked, Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { AlgorithmicSystemCard } from './interfaces/cards';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { translateText } from './shared/utilities';

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
  public translatedAlgorithmicSystemName: Record<string, string> = {};

  private readonly _algorithmicSystemNames: string[] = [];
  private readonly _translateText = translateText;

  constructor(private readonly _translationService: TranslationService) {}

  ngAfterViewChecked(): void {
    this.translateLiterals();
  }

  public changeView(view?: string): void {
    this.translateLiterals();
    this.currentView = view ?? 'home';
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this.algorithmicSystemDetails = details;
    const algorithmicSystemNameToTranslate =
      this._translationService.translateText(details.title, 'es');
    this._translateText(
      this._algorithmicSystemNames,
      details.title,
      this.translatedAlgorithmicSystemName,
      algorithmicSystemNameToTranslate
    );
  }

  public translateLiterals(): void {
    const literals = this._translationService.getStoredLiterals();
    if (literals) this._translationService.translateLiterals(literals);
  }
}
