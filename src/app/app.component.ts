import { Component, HostListener } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'betacomioAngular';
  constructor(private sessionService: SessionService, private router: Router, public hideFoot: AppRoutingModule){

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
