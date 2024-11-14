import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { tabsData } from './tabs-data.config';
import { IFieldData, ITabData } from './tabs-data.model';
import { CommonModule } from '@angular/common';
import { TabFieldDataComponent } from '../../../../shared/tab-field-data/tab-field-data.component';
import { AccordionComponent } from '../../../../shared/accordion/accordion.component';
import { Subscription } from 'rxjs';
import { FieldContentService } from '../../../../services/field-content.service';

@Component({
  selector: 'app-tabs-data',
  standalone: true,
  imports: [CommonModule, TabFieldDataComponent, AccordionComponent],
  templateUrl: './tabs-data.component.html',
  styleUrl: './tabs-data.component.scss',
})
export class TabsDataComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output()
  private readonly _setMarginTop = new EventEmitter<number>();

  public tabsData: ITabData[] = tabsData;
  public currentTabIndex = 0;

  private _fieldContentSuscription!: Subscription;

  constructor(
    private readonly _fieldContentService: FieldContentService,
    private readonly _el: ElementRef
  ) {}

  ngOnInit(): void {
    this._getTabFieldContent(this.currentTabIndex);
  }

  ngOnDestroy(): void {
    if (this._fieldContentSuscription)
      this._fieldContentSuscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._setMarginTop.emit(this._setTabsHeight());
  }

  @HostListener('window:resize')
  onResize(): void {
    this._setMarginTop.emit(this._setTabsHeight());
  }

  private _setTabsHeight(): number {
    const tabsContainer = this._el.nativeElement.querySelector(
      '.tabs-data-container__tabs'
    );
    return tabsContainer.offsetHeight;
  }

  public getTabs(tabData: ITabData): string {
    return tabData.tab;
  }

  private _getTabFieldContent(tabIndex: number): void {
    this._fieldContentSuscription = this._fieldContentService
      .getFieldContent()
      .subscribe((field) => {
        const currentField = this.tabsData[tabIndex].fields;
        currentField.forEach((tabField, tabFieldIndex) => {
          tabField.content = Object.values(field)[tabIndex][tabFieldIndex];
        });
      });
  }

  public setTabFields(index: number): IFieldData[] {
    window.scrollTo(0, 0);
    this.currentTabIndex = index;
    this._getTabFieldContent(this.currentTabIndex);
    return this.tabsData[this.currentTabIndex].fields;
  }
}
