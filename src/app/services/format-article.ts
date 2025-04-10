import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class FormatArticleService {
    constructor() { }


    formatArticle(text: string): string {
        let lines = text.split('\n');
        let html = '';

        lines.forEach(line => {
            line = line.trim();
            if (line === '') return;

            if (/^\d{2}-/.test(line)) {
                html += `<img src="assets/images/${line}.jpg" alt="${line}">`;
            } else if (line.endsWith('?')) {
                html += `<h2>${line}</h2>`;
            } else if (line.startsWith('PHOTOGRAPHIE DE') || line.startsWith('De ')) {
                html += `<small>${line}</small>`;
            } else {
                html += `<p>${line}</p>`;
            }
        });

        return html;
    }
}
