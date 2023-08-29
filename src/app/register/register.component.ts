import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il Router per il reindirizzamento

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    username: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if(this.userData.password_confirmation == this.userData.password && this.userData.username.includes('@'))
    {
      this.http
      .post('http://localhost:5067/Auth/Register', this.userData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/home'], {
            queryParams: { msg: 'ti sei registrato' }, // Passa il messaggio tramite queryParams
          });
        },
        (error) => {
          console.error('Registration failed:', error);
          // Gestione degli errori
        }
      );

    } else {
      alert("registrazione fallita");
      this.userData = {
        username: '',
        password: '',
        password_confirmation: '',
      };
      this.router.navigate(['/register']);
    }
    
  }
  
}

