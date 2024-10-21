import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';
import { BannerComponent } from './shared/banner/banner.component';
import { TopicCardComponent } from './shared/topic-card/topic-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    SystemsSearcherComponent,
    SystemDetailComponent,
    BannerComponent,
    TopicCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public currentView = 'home';
  public algorithmicSystemName = '';

  public changeView(view?: string) {
    this.currentView = view ?? 'home';
  }

  public setHeader(name: string) {
    this.algorithmicSystemName = name;
  }
}
