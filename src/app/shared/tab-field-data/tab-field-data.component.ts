import { Component, Input } from '@angular/core';
import { IFieldData } from '../../pages/system-detail/components/tabs-data/tabs-data.model';

@Component({
  selector: 'app-tab-field-data',
  standalone: true,
  imports: [],
  templateUrl: './tab-field-data.component.html',
  styleUrl: './tab-field-data.component.scss',
})
export class TabFieldDataComponent {
  @Input()
  public field!: IFieldData;

  public toggleFieldDescription(): void {
    if (this.field.description)
      this.field.description.isVisible = !this.field.description?.isVisible;
  }
}
