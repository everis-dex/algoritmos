import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-chip',
  standalone: true,
  imports: [],
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.scss',
})
export class CategoryChipComponent {
  @Input()
  public categoryName!: string;

  @Output()
  private readonly _selectCategory = new EventEmitter<void>();

  public selectCategory(): void {
    this._selectCategory.emit();
  }
}
