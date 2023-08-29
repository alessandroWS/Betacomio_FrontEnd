// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importa il tap operator per la gestione del token
import { UserLoginDto, UserRegisterDto, ServiceResponse } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5067/Auth'; 
  private jwtTokenKey = 'jwtToken'; // Chiave utilizzata per il salvataggio del token nel localStorage

  constructor(private http: HttpClient) { }

  // register(user: UserRegisterDto): Observable<ServiceResponse<number>> {
  //   return this.http.post<ServiceResponse<number>>(`${this.apiUrl}/Register`, user);
  // }

  login(user: UserLoginDto): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>(`${this.apiUrl}/Login`, user).pipe(
      // Salva il token nel localStorage utilizzando il tap operator
      tap(response => {
        if (response.success && response.data) {
          this.setJwtToken(response.data);
        }
      })
    );
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }

  private setJwtToken(token: string): void {
    localStorage.setItem(this.jwtTokenKey, token);
  }

  
  loggedUser = (): string | null => (localStorage.getItem(this.jwtTokenKey)) ? localStorage.getItem(this.jwtTokenKey) : "";

  isLogged = (): boolean => (localStorage.getItem(this.jwtTokenKey)) ? true : false;

  clearUser = (): void => localStorage.removeItem(this.jwtTokenKey); //metodo che toglie il token (logout)

  clearAll = (): void => localStorage.clear(); //metodo che pulisce tutto
}
