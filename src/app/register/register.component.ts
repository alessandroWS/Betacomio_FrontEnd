import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Importa il Router per il reindirizzamento
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


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

  regNum: number = 0;


  nameField = new FormControl('', Validators.required);
  pswField = new FormControl('', Validators.required);

  registrationForm: FormGroup;


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {

    this.regNum = 0;

    this.route.queryParams.subscribe(params => {
      if (params['reg'] === 'email ex') {
        this.regNum = 1;
      }
    });
  }



  register() {
    if (this.userData.password_confirmation == this.userData.password && this.userData.username.includes('@')) {
      this.http
        .post('http://localhost:5067/Auth/Register', this.userData)
        .subscribe(
          (response: any) => {
            console.log('Registration successful:', response);
            this.router.navigate(['/home'], {
              queryParams: { reg: 'success reg' }, // Passa il messaggio tramite queryParams
            });
          },
          (error) => {
            console.error('Registration failed:', error);
            // Gestione degli errori
            this.router.navigate(['/register'], {
              queryParams: { reg: 'email ex' }, // Passa il messaggio tramite queryParams
            });
          }
        );

    } else {
      alert("registrazione fallita");
      this.userData = {
        username: '',
        password: '',
        password_confirmation: '',
      };
      //this.router.navigate(['/login']);
    }

  }

}

