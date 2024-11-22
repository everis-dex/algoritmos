import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit {
  @Input()
  public currentView!: string;
  @Input()
  public algorithmicSystemName!: string;
  @Input()
  public translatedAlgorithmicSystemName!: string;

  @Output()
  private readonly _changeView = new EventEmitter<void>();

  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public redirectToHomeView(event: Event): void {
    event.preventDefault();
    this._changeView.emit();
  }
}
