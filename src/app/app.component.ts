import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { AlgorithmicSystemCard } from './interfaces/cards';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { GecoService } from './services/geco.service';

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
export class AppComponent implements OnInit {
  public currentView = 'home';
  public algorithmicSystemDetails: AlgorithmicSystemCard = {
    id: 0,
    state: '',
    title: '',
    description: '',
    categoryChips: [],
  };
  public loaded = false;

  constructor(private gecoService: GecoService) {}

  public changeView(view?: string): void {
    this.currentView = view ?? 'home';
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this.algorithmicSystemDetails = details;
  }

ngOnInit(): void {
  const myapp = document.getElementById('algoritmos');
  this.gecoService.getGeco().subscribe((htmlContent: string) => {
    document.body.innerHTML = htmlContent;
    const main = document.getElementById('main');
    if (main && myapp) {
      this.loaded = true;
      const appRoot = document.createElement('app-root');
      appRoot.appendChild(myapp);
      main.appendChild(appRoot);
    }
  });
}

  
}
