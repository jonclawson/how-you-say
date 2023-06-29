import 'zone.js/dist/zone';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { VoiceService } from './voice.service';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './translate.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { catchError, Observable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './template.html',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  name = 'How You Say';
  description = 'Say "How you say" followed by some words.';
  source = 'en-US';
  target = 'es-MX';
  targetLanguage = { locale: 'es-MX', name: 'Spanish', class: 'flag-mx' };
  speech = '';
  transcript = '';
  translation;
  message = '';
  history = [];
  apiError;
  languages = [
    { locale: 'es-MX', name: 'Spanish', class: 'flag-mx' },
    { locale: 'de-DE', name: 'German', class: 'flag-de' },
  ];
  private subscriptions = [];
  constructor(
    public voice: VoiceService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.listen();
  }

  ngAfterViewInit() {
    this.setTarget('es-MX');
  }

  ngOnDestroy() {
    this.stop();
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  listen() {
    this.voice.command('how you say');
    const sub = this.voice.messagesSub.subscribe((messages) => {
      if (messages && messages.length) {
        this.message = messages[messages.length - 1];
        this.history.push(this.message);
        this.translate();
      }
    });
    this.subscriptions.push(sub);
  }

  stop() {
    this.voice.stop();
  }

  setTarget(locale: string) {
    this.target = locale;
    this.targetLanguage = this.languages.find((l) => l.locale === locale);
  }

  translate() {
    const sub = this.languageService
      .translate(this.message, this.target, this.source)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          console.log(e);
          this.apiError = e.error.message;
          return throwError(
            () => new Error('Something bad happened; please try again later.')
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
        if (response) {
          this.translation = response;
        }
      });
    this.subscriptions.push(sub);
  }
}
bootstrapApplication(App, {
  providers: [
    importProvidersFrom([
      HttpClientModule,
      // BrowserAnimationsModule,
      // BsDropdownModule.forRoot(),
    ]),
  ],
}).catch((err) => console.error(err));
