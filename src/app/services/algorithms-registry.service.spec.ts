import { TestBed } from '@angular/core/testing';

import { AlgorithmsRegistryService } from './algorithms-registry.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockAlgorithms } from '../mocks/algorithms';

describe('AlgorithmsRegistryService', () => {
  let service: AlgorithmsRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), HttpTestingController],
    });
    service = TestBed.inject(AlgorithmsRegistryService);

    service.algorithms = mockAlgorithms;
  });

  describe('onFiltersSearch', () => {
    it('should filter by tema', () => {
      const filters = {
        estat: '',
        tema: 'Informació i comunicació',
        etiquetes: '',
        tipus_sistema: '',
      };
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.tema === filters.tema
      );

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should filter by estat', () => {
      const filters = {
        estat: 'Actiu',
        tema: '',
        etiquetes: '',
        tipus_sistema: '',
      };
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.estat === filters.estat
      );

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should filter by etiquetes', () => {
      const filters = {
        estat: '',
        tema: '',
        etiquetes: 'ia',
        tipus_sistema: '',
      };
      const filteredMockAlgorithms = mockAlgorithms.filter((algorithm) =>
        algorithm.etiquetes.toLowerCase().includes(filters.etiquetes)
      );

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should return all results when no filters are applied', () => {
      const filters = {
        estat: '',
        tema: '',
        etiquetes: '',
        tipus_sistema: '',
      };

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(mockAlgorithms);
    });

    it('should handle case-insensitive filtering', () => {
      const filters = {
        estat: 'actiu',
        tema: '',
        etiquetes: '',
        tipus_sistema: '',
      };
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.estat.toLowerCase() === filters.estat
      );

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should handle multiple filters simultaneously', () => {
      const filters = {
        estat: 'En producció',
        tema: 'Informació i comunicació',
        etiquetes: 'ia',
        tipus_sistema: "Sistema d'IA",
      };
      const filteredMockAlgorithms = mockAlgorithms.filter((algorithm) => {
        return (
          algorithm.estat === filters.estat &&
          algorithm.tema === filters.tema &&
          algorithm.etiquetes.includes(filters.etiquetes) &&
          algorithm.tipus_sistema === filters.tipus_sistema
        );
      });

      const result = service.onFiltersSearch(filters);
      expect(result).toEqual(filteredMockAlgorithms);
    });
  });

  describe('onOpenSearch', () => {
    it('should find matches in nom field', () => {
      const result = service.onOpenSearch('V1');
      const filteredMockAlgorithms = mockAlgorithms.filter((algorithm) =>
        algorithm.nom.includes('V1')
      );

      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should find matches in tema field', () => {
      const result = service.onOpenSearch('Informació i comunicació');
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.tema === 'Informació i comunicació'
      );

      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should find matches in estat field', () => {
      const result = service.onOpenSearch('Actiu');
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.estat === 'Actiu'
      );

      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should find matches in etiquetes field', () => {
      const result = service.onOpenSearch('copilot');
      const filteredMockAlgorithms = mockAlgorithms.filter((algorithm) =>
        algorithm.etiquetes.includes('copilot')
      );

      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should find matches in tipus_sistema field', () => {
      const result = service.onOpenSearch("Sistema d'IA");
      const filteredMockAlgorithms = mockAlgorithms.filter(
        (algorithm) => algorithm.tipus_sistema === "Sistema d'IA"
      );

      expect(result).toEqual(filteredMockAlgorithms);
    });

    it('should return empty array for no matches', () => {
      const result = service.onOpenSearch('nonexistent');
      expect(result).toEqual([]);
    });

    it('should handle empty search text', () => {
      const result = service.onOpenSearch('');
      expect(result).toEqual(mockAlgorithms);
    });
  });
});
