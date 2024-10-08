import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SystemsSearcherComponent } from './pages/systems-searcher/systems-searcher.component';
import { SystemDetailComponent } from './pages/system-detail/system-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'registre-ia', pathMatch: 'full' },
      {
        path: 'registre-ia',
        children: [
          { path: '', component: HomeComponent },
          { path: 'cercador-sistemes', component: SystemsSearcherComponent },
          { path: ':algorithmicSystemId', component: SystemDetailComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
