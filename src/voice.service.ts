import { NgZone, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  subscription: Subscription;
  done = false;
  speechSub = new BehaviorSubject('');
  transcriptSub = new BehaviorSubject('');
  messagesSub = new BehaviorSubject([]);
  speech: string = '';
  transcript = '';
  messages = [];
  constructor(private ngZone: NgZone) {}

  listen(locale = 'en-US'): Observable<string> {
    return new Observable((observer) => {
      const SpeechRecognition: any = (window as any).webkitSpeechRecognition;
      const speechRecognition: any = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = locale;

      speechRecognition.onresult = (speechRecognitionEvent: any) => {
        let speech = '';

        [...speechRecognitionEvent.results].forEach((result, index) => {
          if (index >= speechRecognitionEvent.resultIndex) {
            if (result.isFinal) {
              this.done = true;
              this.ngZone.run(() => observer.next(result[0].transcript.trim()));
            } else {
              this.done = false;
              speech += result[0].transcript;
              this.ngZone.run(() => observer.next(speech.trim()));
            }
          }
        });
      };

      speechRecognition.start();

      return () => speechRecognition.abort();
    });
  }

  command(keyword: string) {
    let matched = false;
    this.subscription = this.listen().subscribe((speech) => {
      if (speech.startsWith(keyword) && this.done) {
        const msg = speech.replace(keyword, '');
        if (msg) {
          this.messages.push(msg);
          this.messagesSub.next(this.messages);
          this.transcript += msg;
          this.transcriptSub.next(this.transcript);
        } else {
          matched = true;
        }
      }
      if (matched === true && !speech.includes(keyword) && this.done) {
        this.messages.push(speech);
        this.messagesSub.next(this.messages);
        this.transcript += speech;
        this.transcriptSub.next(this.transcript);
        matched = false;
      }
      this.speech = speech;
      this.speechSub.next(this.speech);

      if (this.done) {
        setTimeout(
          function () {
            this.speech = '';
          }.apply(this),
          15000
        );
      }
    });
  }

  record() {
    this.subscription = this.listen().subscribe((transcript) => {
      if (transcript !== '' && this.done) {
        this.transcript = this.transcript + ' ' + transcript;
        this.transcriptSub.next(this.transcript);
      } else {
        this.speech = transcript;
        this.speechSub.next(this.speech);
      }
    });
  }

  stop() {
    this.subscription.unsubscribe();
  }
}
