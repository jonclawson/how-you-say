import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) {}

  public translate(message, target, source = 'en'): Observable<any> {
    return this.useRapidApi(message, target, source);
  }

  private useRapidApi(message, target, source): Observable<any> {
    const url =
      'https://translated-mymemory---translation-memory.p.rapidapi.com/get';
    const options = {
      params: { langpair: `${source}|${target}`, q: message },
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'b1522a8653msh86fe10e88ebc720p1a85a2jsn2ce002ad0b4c',
        'X-RapidAPI-Host':
          'translated-mymemory---translation-memory.p.rapidapi.com',
      }),
    };
    return this.http.get(url, options).pipe(
      map((response: any) => {
        return response.responseData.translatedText;
      })
    );
  }

  private useApiLayer(message, target, source): Observable<any> {
    const url = 'https://api.apilayer.com/language_translation/translate';

    const options = {
      params: { target, source },
      headers: { apikey: '!NyZ1diDY5B5V5XylD5rUyxIsYcoSQyfY' },
    };
    return this.http.post(url, message, options).pipe(
      map((response: any) => {
        return response.translations[0].translation;
      })
    );
  }
}
