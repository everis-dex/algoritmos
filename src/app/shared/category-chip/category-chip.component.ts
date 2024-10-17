import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-category-chip',
  standalone: true,
  imports: [],
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.scss',
})
export class CategoryChipComponent implements OnInit, OnDestroy {
  public popularCategories: string[] | null = null;

  private _categoriesSuscription!: Subscription;

  @Output()
  private readonly _selectCategory = new EventEmitter<string>();

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    const categoriesSaved =
      this._sessionStorage.getItem<string[]>('popularCategories');
    if (categoriesSaved !== null) {
      this.popularCategories = categoriesSaved;
    } else {
      this._categoriesSuscription = this._categoryService
        .getCategories()
        .subscribe((categories) => {
          this.popularCategories = categories;
          this._sessionStorage.setItem(
            'popularCategories',
            this.popularCategories
          );
        });
    }
  }

  ngOnDestroy(): void {
    if (this._categoriesSuscription) this._categoriesSuscription.unsubscribe();
  }

  public selectCategory(category: string): void {
    this._selectCategory.emit(category);
  }
}
