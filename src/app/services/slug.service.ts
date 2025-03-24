import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlugService {

  constructor() { }

  createSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9 ]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-'); // Remplace les espaces par des tirets
  }
}
