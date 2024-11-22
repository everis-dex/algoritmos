import {
  AfterViewChecked,
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
import { TranslationService } from '../../../../services/translation.service';
import { getLiterals } from '../../../../shared/utilities';

@Component({
  selector: 'app-tabs-data',
  standalone: true,
  imports: [CommonModule, TabFieldDataComponent, AccordionComponent],
  templateUrl: './tabs-data.component.html',
  styleUrl: './tabs-data.component.scss',
})
export class TabsDataComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  @Output()
  private readonly _setMarginTop = new EventEmitter<number>();

  public tabsData: ITabData[] = tabsData;
  public currentTabIndex = 0;

  private readonly _componentSubscriptions: Subscription[] = [];
  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(
    private readonly _fieldContentService: FieldContentService,
    private readonly _el: ElementRef,
    private readonly _translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
    this._getTabFieldContent(this.currentTabIndex);
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  ngAfterViewInit(): void {
    this._setMarginTop.emit(this._getTabsHeight());
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  @HostListener('window:resize')
  onResize(): void {
    this._setMarginTop.emit(this._getTabsHeight());
  }

  private _getTabsHeight(): number {
    const tabsContainer = this._el.nativeElement.querySelector(
      '.tabs-data-container__tabs'
    );
    return tabsContainer.offsetHeight;
  }

  public getTabs(tabData: ITabData): string {
    this.tabsData = tabsData.map((tab) => {
      tab.tab = this.getTranslatedText(`system-detail.tabs.${tab.key}`);
      return tab;
    });
    return tabData.tab;
  }

  private _getTabFieldContent(tabIndex: number): void {
    this._fieldContentService.getFieldContent().subscribe((field) => {
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

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
