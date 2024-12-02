import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { tabsData } from './tabs-data.config';
import { IFieldData, ITabData } from './tabs-data.model';
import { CommonModule } from '@angular/common';
import { TabFieldDataComponent } from '../../../../shared/tab-field-data/tab-field-data.component';
import { AccordionComponent } from '../../../../shared/accordion/accordion.component';
import { IAlgorithm } from '../../../../interfaces/algorithms';

@Component({
  selector: 'app-tabs-data',
  standalone: true,
  imports: [CommonModule, TabFieldDataComponent, AccordionComponent],
  templateUrl: './tabs-data.component.html',
  styleUrl: './tabs-data.component.scss',
})
export class TabsDataComponent implements OnInit, AfterViewInit {
  @Input()
  public algorithm!: IAlgorithm;

  @Output()
  private readonly _setMarginTop = new EventEmitter<number>();

  public tabsData: ITabData[] = tabsData;
  public currentTabIndex = 0;

  constructor(private readonly _el: ElementRef) {}

  ngOnInit(): void {
    if (this.algorithm) this._getTabFieldContents(this.currentTabIndex);
  }

  ngAfterViewInit(): void {
    this._setMarginTop.emit(this._getTabsHeight());
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
    return tabData.tab;
  }

  private _getTabFieldContents(tabIndex: number): void {
    const algorithmFieldsContent: Record<string, string>[] = [
      {
        'Nivell de risc': this.algorithm.nivell_de_risc,
        "Forma d'adquisició": this.algorithm.forma_adquisicio,
        'Font de finançament': this.algorithm.font_financament,
        'Desenvolupador': this.algorithm.desenvolupador,
        'Unitat responsable': this.algorithm.unitat_responsable,
        'Tema': this.algorithm.tema,
        'Declarat com actuació administrativa automatizada':
          this.algorithm.actuacio_administrativa_automatitzada,
        'Política pública on intervé el sistema':
          this.algorithm.politica_publica,
        "Data d'entrada": this.algorithm.data_posada_produccio,
        "Data de l'última modificació": this.algorithm.data_ultima_modificacio,
        'Motiu de la motificació': this.algorithm.motiu_modificacio,
        'Data de desmantellament': this.algorithm.data_retirada,
      },
      {
        'Tasca del sistema en el procediment':
          this.algorithm.procediment_objeccio,
        'Tipus de sistema algorístic': this.algorithm.tipus_sistema,
        'Rendiment': this.algorithm.rendiment,
        'Dades usades per al seu funcionament':
          this.algorithm.dades_funcionament,
        'Dades utilitzades en producció': this.algorithm.dades_entrenament,
        'Equitat': this.algorithm.equitat,
      },
      {
        "Regulació aplicable a l'algorisme": this.algorithm.normativa_aplicable,
        'Dades personals': this.algorithm.dades_personals,
        "Avaluació d'execució del sistema / algorisme":
          this.algorithm.avaluacio_execucio_sistema,
        'Beneficis': this.algorithm.beneficis,
        'Perfil de la ciutadania afectada':
          this.algorithm.perfil_ciutadania_afectada,
        'Riscos': this.algorithm.riscos,
        'Explicabilitat': this.algorithm.explicabilitat,
        "Composició de l'equip": this.algorithm.composicio_equip,
        'Invervenció / supervisió humana':
          this.algorithm.intervencio_supervisio_humana,
        "Procediment d'objecció": this.algorithm.procediment_objeccio,
        'Consum energètic': this.algorithm.consum_energetic,
      },
    ];
    this.tabsData[tabIndex].fields.forEach((field) => {
      let content = algorithmFieldsContent[tabIndex][field.field];
      if (content?.includes('https')) {
        content = content.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1">$1<img src="assets/icons/Redirection-link.svg"></a>'
        );
      }
      field.content = content || 'N-A';
    });
  }

  public setTabFields(index: number): IFieldData[] {
    window.scrollTo(0, 0);
    this.currentTabIndex = index;
    this._getTabFieldContents(this.currentTabIndex);
    return this.tabsData[this.currentTabIndex].fields;
  }
}
