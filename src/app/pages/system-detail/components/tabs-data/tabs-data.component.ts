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
import { TABS_DATA } from './tabs-data.config';
import { IFieldData, ITabData } from './tabs-data.model';
import { CommonModule } from '@angular/common';
import { TabFieldDataComponent } from '../../../../shared/components/tab-field-data/tab-field-data.component';
import { AccordionComponent } from '../../../../shared/components/accordion/accordion.component';
import { IAlgorithm } from '../../../../shared/interfaces/algorithms.model';
import { DomSanitizer } from '@angular/platform-browser';

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

  public tabsData = TABS_DATA;
  public currentTabIndex = 0;

  constructor(
    private readonly _el: ElementRef,
    private readonly _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._getTabFieldContents(this.currentTabIndex);
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
    if (this.algorithm) {
      const algorithmFieldsContent: Record<string, string>[] = [
        {
          'Nivell de risc': this.algorithm.nivell_de_risc,
          'Forma de desenvolupament': this.algorithm.forma_adquisicio,
          'Fonts de finançament': this.algorithm.font_financament,
          'Desenvolupador': this.algorithm.desenvolupador,
          'Unitat responsable': this.algorithm.unitat_responsable,
          'Tema': this.algorithm.tema,
          'Actuació administrativa automatitzada':
            this.algorithm.actuacio_administrativa_automatitzada,
          'Intervenció o vinculació del sistema respecte a una política pública':
            this.algorithm.politica_publica,
          'Data de la posada en funcionament':
            this.algorithm.data_posada_produccio,
          "Data de l'última modificació":
            this.algorithm.data_ultima_modificacio,
          'Motiu de la modificació': this.algorithm.motiu_modificacio,
          'Data de retirada': this.algorithm.data_retirada,
        },
        {
          'Tipus de sistema': this.algorithm.tipus_sistema,
          'Rendiment': this.algorithm.rendiment,
          'Dades de funcionament': this.algorithm.dades_funcionament,
          "Dades d'entrenament": this.algorithm.dades_entrenament,
          'Equitat': this.algorithm.equitat,
        },
        {
          "Normativa":
            this.algorithm.normativa_aplicable,
          'Dades personals': this.algorithm.dades_personals,
          "Avaluació de l'execució": this.algorithm.avaluacio_execucio_sistema,
          'Beneficis': this.algorithm.beneficis,
          'Persones destinatàries': this.algorithm.perfil_ciutadania_afectada,
          'Riscos': this.algorithm.riscos,
          'Funcionament': this.algorithm.explicabilitat,
          "Dades sobre l'equip de desenvolupament":
            this.algorithm.composicio_equip,
          "Intervenció o supervisió d'una persona en els resultats":
            this.algorithm.intervencio_supervisio_humana,
          "Procediment d'oposició": this.algorithm.procediment_objeccio,
          'Consum energètic': this.algorithm.consum_energetic,
        },
      ];
      this.tabsData[tabIndex].fields.forEach((field) => {
        let content = algorithmFieldsContent[tabIndex][field.field];
        if (content?.includes('https')) {
          content = content.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener" title="opens in a new window" style="text-decoration: underline; color: #c00000">$1<img src="assets/icons/external-link-redirection.svg" alt=""></a>'
          );
        }
        field.content = this._sanitizer.bypassSecurityTrustHtml(
          content || 'N-A'
        );
      });
    }
  }

  public setTabFields(index: number): IFieldData[] {
    window.scrollTo(0, 0);
    this.currentTabIndex = index;
    this._getTabFieldContents(this.currentTabIndex);
    return this.tabsData[this.currentTabIndex].fields;
  }
}
