// session.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private inactivityTimer: any;

  constructor(private router: Router) {}

  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
        localStorage.removeItem('jwtToken');
        //alert("SESSIONE SCADUTA"); 
        this.router.navigate(['/session-expired']);       
    }, 180000); // 7200000 millisecondi (2 ore) / 180000 mill = 3 minuti
  }
}
