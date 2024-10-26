import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Accordion } from '../../../interfaces/accordion';
import { ChipsComponent } from '../../chips/chips.component';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, ChipsComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnInit {
  @Input()
  public accordionList!: Accordion[];

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};

  ngOnInit(): void {
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = { display: false, rotation: false };
    });
  }

  public toggle(id: string): void {
    this.toggleStates[id] = {
      display: !this.toggleStates[id].display,
      rotation: !this.toggleStates[id].rotation,
    };
  }
}
