import { Component, Input, OnInit } from '@angular/core';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { AlgorithmicSystemCard } from '../../interfaces/cards';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [BasicDataComponent],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.scss',
})
export class SystemDetailComponent implements OnInit {
  @Input()
  public algorithmicSystem!: AlgorithmicSystemCard;

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
