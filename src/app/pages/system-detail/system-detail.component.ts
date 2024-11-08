import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.scss',
})
export class SystemDetailComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
