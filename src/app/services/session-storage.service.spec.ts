import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item correctly', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };

    service.setItem(key, value);

    const storedValue = sessionStorage.getItem(key);
    expect(storedValue).toBeTruthy();
    expect(JSON.parse(storedValue as string)).toEqual(value);
  });

  it('should get item correctly', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };
    sessionStorage.setItem(key, JSON.stringify(value));

    const result = service.getItem(key);
    expect(result).toEqual(value);
  });

  it('should return null if item does not exist', () => {
    const result = service.getItem('nonExistingKey');
    expect(result).toBeNull();
  });

  it('should remove item correctly', () => {
    const key = 'testKey';
    sessionStorage.setItem(key, JSON.stringify({ name: 'testValue' }));

    service.removeItem(key);

    const result = sessionStorage.getItem(key);
    expect(result).toBeNull();
  });

  it('should clear all items correctly', () => {
    sessionStorage.setItem('key1', JSON.stringify({ name: 'value1' }));
    sessionStorage.setItem('key2', JSON.stringify({ name: 'value2' }));

    service.clear();

    expect(sessionStorage.length).toBe(0);
  });
});
