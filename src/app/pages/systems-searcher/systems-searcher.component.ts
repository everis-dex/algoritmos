import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { Subscription } from 'rxjs';
import { CardService } from '../../services/card.service';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@Component({
  selector: 'app-systems-searcher',
  standalone: true,
  imports: [SearchBarComponent, SearchFiltersComponent, SearchResultsComponent],
  templateUrl: './systems-searcher.component.html',
  styleUrl: './systems-searcher.component.scss',
})
export class SystemsSearcherComponent implements OnInit, OnDestroy {
  @Output()
  private readonly _setHeader = new EventEmitter<string>();
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  public searchResults: AlgorithmicSystemCard[] = [];
  public filterList: { filter: string; optionsSelected: string[] }[] = [];

  private _algorithmicSystemsSuscription!: Subscription;

  constructor(private readonly _algorithmicSystemService: CardService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._algorithmicSystemsSuscription = this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.searchResults = response;
      });
  }

  ngOnDestroy(): void {
    if (this._algorithmicSystemsSuscription)
      this._algorithmicSystemsSuscription.unsubscribe();
  }

  public filtersApplied(
    updatedFilterList: { filter: string; optionsSelected: string[] }[]
  ): void {
    this.filterList = updatedFilterList;
  }

  public changeView(view: string): void {
    this._changeView.emit(view);
  }

  public setHeader(name: string): void {
    this._setHeader.emit(name);
  }
}
