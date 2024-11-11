import { Component, Input } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getStateColor } from '../../../../shared/utilities';

@Component({
  selector: 'app-basic-data-section',
  standalone: true,
  imports: [],
  templateUrl: './basic-data-section.component.html',
  styleUrl: './basic-data-section.component.scss',
})
export class BasicDataSectionComponent {
  @Input()
  public algorithmicSystem!: AlgorithmicSystemCard;

  public getStateColor = getStateColor;
}
