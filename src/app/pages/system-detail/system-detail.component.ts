import { Component, Input, OnInit } from '@angular/core';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { TabsDataComponent } from './components/tabs-data/tabs-data.component';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [BasicDataComponent, TabsDataComponent],
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
