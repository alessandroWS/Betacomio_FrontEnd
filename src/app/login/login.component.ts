import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  myForm: FormGroup | null = null;

  LoginUrl: string = "http://localhost:5067/Auth/Login"

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {}

  ngOnInit() {
    this.login();

    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword]] // Metti tutti i validatori nella stessa array
    });
  }


  //  this.products = response.body?.data.slice(-5);

  login(): void {
    if (this.myForm?.valid) {
      this.http.get<responseLogin>('http://localhost:5067/Auth/Login', { observe: "response"}).subscribe(
      (response) => {
        if(response.body?.success){
          localStorage.setItem('isLogged', 'true')
          this.router.navigate(['/home']); // Reindirizza all'URL '/home'
        } else {
          localStorage.setItem('isLogged', 'false')
        }

      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
    } else {
      // Mostra eventuali messaggi di errore
    }

  }


  validatePassword(control: any) {
    const value = control.value;

    // Verifica che la password abbia almeno una lettera maiuscola, una minuscola e una lunghezza di almeno 8 caratteri
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const validLength = value.length >= 8;

    if (hasUppercase && hasLowercase && validLength) {
      return null;  // La validazione ha successo
    }

    return { invalidPassword: true };  // La validazione fallisce
  }


}

export interface responseLogin {
  data: string,
  success: boolean,
  message: string
}
