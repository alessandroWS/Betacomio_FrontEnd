// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserLoginDto, ServiceResponse } from '../../../model/models';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  msg:string='';
  usnameField = new FormControl('', Validators.required);
  pswField = new FormControl('', Validators.required);
  loginFailed: boolean = false;
  private routeSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    });
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
          localStorage.setItem('islog','true');
          //this.router.navigate(['/home']);
          //window.location.reload();
          //window.location.href="/home";
          this.router.navigate(['/home'], { queryParams: { log : "Logged in"} });
        } else {
          // Gestisci l'errore di login

          // if (response.message === 'Credenziali non valide') {
          //   // Credenziali non valide
          //   alert('Credenziali non valide');
          // }
        }
        //location.reload();

        console.log('Login success:', response.success);
      }
      ,
      (error: HttpErrorResponse) => {
        // Gestisci altri tipi di errori, come problemi di connessione o errori HTTP
        //this.loginFailed = true;

        //alert('Utente non trovato');
        console.error('HTTP Error:', error);
        this.msg = error.error.message

        this.router.navigate(['/login'], { queryParams: { loginFailed: 'true' } });


        //window.location.reload();
      }
    );
  }
}
