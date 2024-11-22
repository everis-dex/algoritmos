import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-systems-searcher-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './systems-searcher-link.component.html',
  styleUrl: './systems-searcher-link.component.scss',
})
export class SystemsSearcherLinkComponent implements OnInit {
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public redirectToSystemsSearcherView(): void {
    this._changeView.emit('systems-searcher');
  }
}
