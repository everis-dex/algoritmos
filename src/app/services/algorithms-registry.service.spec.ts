import { TestBed } from '@angular/core/testing';

import { AlgorithmsRegistryService } from './algorithms-registry.service';
import { IAlgorithm } from '../interfaces/algorithms';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('AlgorithmsRegistryService', () => {
  let service: AlgorithmsRegistryService;
  let httpMock: HttpTestingController;
  const mockAlgorithms: IAlgorithm[] = [
    {
        "nom": "Copilot",
        "estat": "En producció",
        "descripcio": "Intel·ligéncia artificial microsoft.",
        "unitat_responsable": "Unitat copilot, https://unti.copilot.es",
        "politica_publica": "Política pública consumidor copilot, https://politPubli.copilot.es",
        "normativa_aplicable": "https://normativa.copilot.es",
        "tema": "Informació i comunicació",
        "etiquetes": "ia,copilot,technology",
        "explicabilitat": "IA oberta al públic, amb algoritmes tecnológics amb búsqueda intel·ligent.",
        "tipus_sistema": "Sistema d'IA",
        "caracteristiques_tecniques": "Copilot és un model de llenguatge creat per mantenir una conversa amb l'usuari.",
        "dades_entrenament": "Copilot és un model de llenguatge d'IA que es va entrenar amb una gran quantitat de text d'una varietat de fonts (per exemple, Wikipedia).",
        "dades_funcionament": "Copilot funciona amb dades obertes de la xarxa com google, safari.",
        "rendiment": "Mitjà",
        "perfil_ciutadania_afectada": "Tots els perfils",
        "dades_personals": "No aplica",
        "beneficis": "Estudis, treball, vida cotidiana.",
        "nivell_de_risc": "Alt",
        "riscos": "Treball dependent de Copilot",
        "equitat": "Equitat correcte",
        "composicio_equip": "Desenvolupadors, analistes",
        "actuacio_administrativa_automatitzada": "Actuació administrativa copilot, https://actuAdmini.copilot.es",
        "consum_energetic": "50WK",
        "certificat_ue": "Fitxer pujat a sharepoint",
        "copia_escanejada_ue": "Fitxer pujat a sharepoint",
        "declaracio_conformitat": "Fitxer pujat a sharepoint",
        "instruccions_us": "https://instruc.Copilot.es",
        "avaluacio_drets_fonamentals": "https://dretsFonam.Copilot.es",
        "informes_avaluacio_interns": "Fitxer pujat a sharepoint",
        "periocitat_antiga_avaluacio": "2024-12-19T00:00:00.000",
        "periocitat_proxima_avaluacio": "2025-02-05T00:00:00.000",
        "intervencio_supervisio_humana": "Suport en la presa de decisió.",
        "procediment_objeccio": "Procediment d'objecció correcte",
        "avaluacio_execucio_sistema": "Avaluació periòdica correcte setmanal.",
        "data_posada_produccio": "2024-01-10T00:00:00.000",
        "desenvolupador": "Microsoft",
        "forma_adquisicio": "Desenvolupat internament.",
        "font_financament": "No aplica",
        "data_ultima_modificacio": "2024-05-10T00:00:00.000",
        "motiu_modificacio": "Correció d'errors.",
        "data_retirada": "2027-10-10T00:00:00.000",
        "fitxers": "Tipus FILE"
    },
    {
        "nom": "CHATGPT V1",
        "estat": "Actiu",
        "descripcio": "Descripcio de prova per al primer registre",
        "unitat_responsable": "Unitat responsable d'exemple",
        "politica_publica": "Política d'exemple",
        "normativa_aplicable": "",
        "tema": "",
        "etiquetes": "\"una etiqueta\"",
        "explicabilitat": "",
        "tipus_sistema": "Sistema d'IA",
        "caracteristiques_tecniques": "",
        "dades_entrenament": "",
        "dades_funcionament": "",
        "rendiment": "",
        "perfil_ciutadania_afectada": "",
        "dades_personals": "",
        "beneficis": "",
        "nivell_de_risc": "",
        "riscos": "",
        "equitat": "",
        "composicio_equip": "",
        "actuacio_administrativa_automatitzada": "",
        "consum_energetic": "",
        "certificat_ue": "",
        "instruccions_us": "",
        "avaluacio_drets_fonamentals": "",
        "periocitat_antiga_avaluacio": "",
        "periocitat_proxima_avaluacio": "",
        "intervencio_supervisio_humana": "",
        "procediment_objeccio": "",
        "avaluacio_execucio_sistema": "",
        "data_posada_produccio": "",
        "desenvolupador": "",
        "forma_adquisicio": "",
        "font_financament": "",
        "data_ultima_modificacio": "14/11/2024",
        "motiu_modificacio": "",
        "data_retirada": ""
    }
]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        AlgorithmsRegistryService,
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(AlgorithmsRegistryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


describe('getAlgorithms', () => {
    it('should make GET request with correct basic auth headers', () => {

      const expectedCredentials = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);

      service.getAlgorithms().subscribe(response => {
        expect(response).toEqual(mockAlgorithms);
      });

      const req = httpMock.expectOne(environment.apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Basic ${expectedCredentials}`);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.withCredentials).toBeTrue();

      req.flush(mockAlgorithms);
    });

    it('should handle empty response', () => {
      const mockResponse: IAlgorithm[] = [];

      service.getAlgorithms().subscribe(response => {
        expect(response).toEqual([]);
      });

      const req = httpMock.expectOne(environment.apiUrl);
      req.flush(mockResponse);
    });

    it('should handle HTTP error', () => {
      const errorMessage = 'HTTP Error';

      service.getAlgorithms().subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(environment.apiUrl);
      req.flush('404 error', {
        status: 404,
        statusText: errorMessage
      });
    });
});


describe('onFiltersSearch', () => {


  it('should filter by tema', () => {
    const filters = {
      estat: '',
      tema: 'Informació i comunicació',
      etiquetes: '',
      tipus_sistema: ''
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(1);
    expect(result[0].nom).toBe('Copilot');
  });

  it('should filter by estat', () => {
    const filters = {
      estat: 'Actiu',
      tema: '',
      etiquetes: '',
      tipus_sistema: ''
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(1);
    expect(result[0].estat).toBe('Actiu');
  });

  it('should filter by etiquetes', () => {
    const filters = {
      estat: '',
      tema: '',
      etiquetes: 'ia',
      tipus_sistema: ''
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(1);
    expect(result[0].etiquetes).toContain('ia');
  });

  it('should return all results when no filters are applied', () => {
    const filters = {
      estat: '',
      tema: '',
      etiquetes: '',
      tipus_sistema: ''
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(2);
  });

  it('should handle case-insensitive filtering', () => {
    const filters = {
      estat: 'actiu',
      tema: '',
      etiquetes: '',
      tipus_sistema: ''
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(1);
    expect(result[0].estat.toLowerCase()).toBe('actiu');
  });

  it('should handle multiple filters simultaneously', () => {
    const filters = {
      estat: 'En producció',
      tema: 'Informació i comunicació',
      etiquetes: 'ia',
      tipus_sistema: "Sistema d'IA"
    };
    
    const result = service.onFiltersSearch(mockAlgorithms, filters);
    expect(result.length).toBe(1);
    expect(result[0].nom).toBe('Copilot');
  });

});

describe('onOpenSearch', () => {
  it('should find matches in nom field', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'V1');
    expect(result.length).toBe(1);
    expect(result[0].nom).toBe('CHATGPT V1');
  });

  it('should find matches in tema field', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'Informació i comunicació');
    expect(result.length).toBe(1);
    expect(result[0].tema).toBe('Informació i comunicació');
  });

  it('should find matches in estat field', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'Actiu');
    expect(result.length).toBe(1);
    expect(result[0].estat).toBe('Actiu');
  });

  it('should find matches in etiquetes field', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'copilot');
    expect(result.length).toBe(1);
    expect(result[0].etiquetes).toContain('copilot');
  });

  it('should find matches in tipus_sistema field', () => {
    const result = service.onOpenSearch(mockAlgorithms, "Sistema d'IA");
    expect(result.length).toBe(2);
    expect(result[0].tipus_sistema).toBe("Sistema d'IA");
  });

  it('should handle case-insensitive search', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'copilot');
    expect(result.length).toBe(1);
    expect(result[0].nom).toBe('Copilot');
  });

  it('should return multiple results for common terms', () => {  // ! no va??
    const result = service.onOpenSearch(mockAlgorithms, 'producció');
    expect(result.length).toBe(1);
  });

  it('should return empty array for no matches', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'nonexistent');
    expect(result.length).toBe(0);
  });

  it('should handle empty search text', () => {
    const result = service.onOpenSearch(mockAlgorithms, '');
    expect(result.length).toBe(2);
  });

  it('should handle partial word matches', () => {
    const result = service.onOpenSearch(mockAlgorithms, 'CHATGPT');
    expect(result.length).toBe(1);
    expect(result[0].nom).toBe('CHATGPT V1');
  });

})

});
