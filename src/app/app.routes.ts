import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registre-ia', pathMatch: 'full' },
  { path: 'registre-ia', component: AppComponent },
  { path: '**', redirectTo: '' },
];
