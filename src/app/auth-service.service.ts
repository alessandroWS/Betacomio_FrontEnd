import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient){}
  prova : boolean = true
  //login
  signInUrl = "http://localhost:5067/Auth/Login"

  private signInButton!: HTMLElement;
  private container!: HTMLElement

  setSignInButton(element: HTMLElement) {
    this.signInButton = element;
  }

  setContainer(element: HTMLElement) {
    this.container = element;
  }


  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status == 400) {
      console.log("awe");

      this.prova = false


    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



  signIn(data:any){
    return this.http.post(this.signInUrl, data, {observe: 'response',  withCredentials:true}).pipe(catchError(this.handleError));
  }



}
