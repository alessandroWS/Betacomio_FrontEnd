import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Importa il Router per il reindirizzamento
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';


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
  loginFailed: boolean = false;


  nameField = new FormControl('', Validators.required);
  pswField = new FormControl('', Validators.required);

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if the login failed query parameter is present
    this.route.queryParams.subscribe(params => {
      if (params['loginFailed']) {
        this.loginFailed = true;
      }
    });
  }

  

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

