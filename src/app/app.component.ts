import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, SystemsSearcherComponent, SystemDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public currentView = 'home';

  public changeView(view: string) {
    this.currentView = view;
  }
}
