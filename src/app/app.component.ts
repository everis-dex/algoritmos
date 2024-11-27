import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { AlgorithmicSystemCard } from './interfaces/cards';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AlgorithmsRegistryService } from './services/algorithms-registry.service';
import { Subject, take, takeUntil } from 'rxjs';
import { IAlgorithm } from './interfaces/algorithms';

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
export class AppComponent implements OnInit, OnDestroy {
  public currentView = 'home';
  public algorithmicSystemDetails: AlgorithmicSystemCard = {
    id: 0,
    state: '',
    title: '',
    description: '',
    categoryChips: [],
  };

  private destroy$ = new Subject<void>();

  constructor(private algorithmsRegistry: AlgorithmsRegistryService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public changeView(view?: string): void {
    this.currentView = view ?? 'home';
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this.algorithmicSystemDetails = details;
  }

  ngOnInit(): void {
    this.algorithmsRegistry.getAlgorithms()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: IAlgorithm[]) => {
        console.log('🚀 ~ res:', res)
      },
      error: (error: any) => {
        console.log('🚀 ~ error:', error)
      }
    })
  }
}
