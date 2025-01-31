import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { TabsDataComponent } from './components/tabs-data/tabs-data.component';
import { MoreInformationCardComponent } from './components/more-information-card/more-information-card.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { IAlgorithm } from '../../shared/interfaces/algorithms.model';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [
    BasicDataComponent,
    TabsDataComponent,
    MoreInformationCardComponent,
    DocumentsComponent,
  ],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.scss',
})
export class SystemDetailComponent implements OnInit {
  @Input()
  public algorithm!: IAlgorithm;

  public marginTop = 0;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public setMarginTop(value: number): void {
    this.marginTop = value;
    this._cdr.detectChanges();
  }
}
