import { Component, Input } from '@angular/core';
import { IAlgorithm } from '../../../../shared/interfaces/algorithms.model';
import { normalized } from '../../../../shared/utilities';

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

  public normalized = normalized;
}
