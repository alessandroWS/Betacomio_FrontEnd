// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserLoginDto, ServiceResponse } from './auth.models';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const user: UserLoginDto = {
      username: this.username,
      password: this.password
    };

    this.authService.login(user).subscribe((response: ServiceResponse<string>) => {
      if (response.success) {
        // Login effettuato con successo, gestisci il token JWT o la logica di reindirizzamento qui
        console.log('Login success:', response.data);
        
        this.router.navigate(['/home']);
      } else {
        // Gestisci il messaggio di errore
        console.error('Login failed:', response.message);
      }
    });
  }
}
