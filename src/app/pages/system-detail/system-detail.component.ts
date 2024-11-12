import { Component, OnInit } from '@angular/core';
import { TabsDataComponent } from './components/tabs-data/tabs-data.component';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [TabsDataComponent],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.scss',
})
export class SystemDetailComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
