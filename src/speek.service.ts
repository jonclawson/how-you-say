import { NgZone, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeekService {
  speek(text: string) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }
}
