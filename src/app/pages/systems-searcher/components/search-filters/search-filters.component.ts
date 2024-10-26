import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionComponent } from '../../../../shared/accordion/accordion/accordion.component';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent {
  public filters = [
    {
      id: 'category-list',
      name: 'Categoria',
      chips: ['Categoria 1', 'Categoria 2', 'Categoria 3'],
    },
    { id: 'tag-list', name: 'Etiquetes' },
    {
      id: 'state-list',
      name: 'Estats',
      chips: ['Estat 1', 'Estat 2', 'Estat 3'],
    },
    {
      id: 'algorithm-type-list',
      name: "Tipus d'algorisme",
      chips: ['Algorisme 1', 'Algorisme 2', 'Algorisme 3'],
    },
  ];
}
