import { Component, Input } from '@angular/core';
import { IAlgorithm } from '../../../../interfaces/algorithms';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss',
})
export class BasicDataComponent {
  @Input()
  public algorithm!: IAlgorithm;
}
