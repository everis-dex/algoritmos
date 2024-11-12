import { Component } from '@angular/core';
import { tabsData } from './tabs-data.config';
import { ILabelsData, ITabsData } from './tabs-data.model';
import { CommonModule } from '@angular/common';
import { TabDataFieldComponent } from '../../../../shared/tab-data-field/tab-data-field/tab-data-field.component';

@Component({
  selector: 'app-tabs-data',
  standalone: true,
  imports: [CommonModule, TabDataFieldComponent],
  templateUrl: './tabs-data.component.html',
  styleUrl: './tabs-data.component.scss',
})
export class TabsDataComponent {
  public tabsData = tabsData;
  public labelsData: ILabelsData[] = Object.values(tabsData[0])[0].labels;
  public currentIndex = 0;

  public getTabKeys(tab: ITabsData[0]): string[] {
    return Object.keys(tab);
  }

  public getTabProperties(tab: ITabsData, index: number): ILabelsData[] {
    this.currentIndex = index;
    this.labelsData = Object.values(tab[this.currentIndex])[0].labels;
    return this.labelsData;
  }
}
