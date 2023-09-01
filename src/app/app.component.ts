import { Component, HostListener } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'betacomioAngular';
  constructor(private sessionService: SessionService){

  }
  ngOnInit(): void {
    this.sessionService.resetInactivityTimer();
  }
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keydown', ['$event'])
  onUserInteraction(event: MouseEvent) {
    // Reimposta il timer di inattività quando l'utente interagisce
    this.sessionService.resetInactivityTimer();}
}
