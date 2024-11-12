import { Component, Input } from '@angular/core';
import { ILabelsData } from '../../../pages/system-detail/components/tabs-data/tabs-data.model';

@Component({
  selector: 'app-tab-data-field',
  standalone: true,
  imports: [],
  templateUrl: './tab-data-field.component.html',
  styleUrl: './tab-data-field.component.scss',
})
export class TabDataFieldComponent {
  @Input()
  public label!: ILabelsData;
}
