import { Component } from '@angular/core';
import { mockDocuments } from '../../../../mocks/documents';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  public documents = mockDocuments;

  // ToDo reemplazar mock por Input de algoritmo y mostrar sus fitxers (serán máximo 10). Backend en desarrollo.
}
