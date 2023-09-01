// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserLoginDto, ServiceResponse } from './auth.models';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  usnameField = new FormControl('', Validators.required);
  pswField = new FormControl('', Validators.required);

  loginFailed: boolean = false;
  private routeSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Check if the login failed query parameter is present


    
    this.route.queryParams.subscribe(params => {
      if (params['loginFailed']) {
        this.loginFailed = true;
      }
      else {
        // Reimposta loginFailed a false al refresh della pagina
        this.loginFailed = false;
      }
    });
  }


  


  onLogin() {
    const user: UserLoginDto = {
      username: this.username,
      password: this.password
    };
    

    this.authService.login(user).subscribe(
      (response: ServiceResponse<string>) => {
        if (response.success) {
          console.log('Login success:', response.data);
          this.router.navigate(['/home']);
        } else {
          // Gestisci l'errore di login
          if (response.message === 'Credenziali non valide') {
            // Credenziali non valide
            alert('Credenziali non valide');
          } else {
            // Altro errore dal server
            alert('Si è verificato un errore durante il login');
            console.error('Login failed:', response.message);
          }
        }
      },
      (error: HttpErrorResponse) => {
        // Gestisci altri tipi di errori, come problemi di connessione o errori HTTP
        //this.loginFailed = true; 
        
        //alert('Utente non trovato');
        console.error('HTTP Error:', error);

        this.router.navigate(['/login'], { queryParams: { loginFailed: 'true' } });
        //window.location.reload();
      }
    );
  }
}
