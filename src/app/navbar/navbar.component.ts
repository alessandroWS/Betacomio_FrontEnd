import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: Category[] | undefined = [];
  requestAdminCount: number | undefined = 0;
  isAdmin: boolean = false; // Aggiungi una variabile per memorizzare il valore "isAdmin"

  constructor(private http: HttpClient, public BasicAuth: AuthService, public Logout: AuthService) {}

  ngOnInit() {
    this.loadCategories();

    // Verifica se l'utente è un amministratore
    const token = this.BasicAuth.getJwtToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
      this.isAdmin = decodedToken.IsAdmin === 'True'; // Imposta la variabile "isAdmin"
    }

    // Esegui la funzione loadRequestAdminCount solo se l'utente è un amministratore
    if (this.isAdmin) {
      this.loadRequestAdminCount();
    }

    const createAnnouncementButton = document.querySelector('#createAnnouncement') as HTMLElement | null;
    const imagesInput = document.querySelector('#images') as HTMLInputElement | null;

    if (createAnnouncementButton && imagesInput) {
      createAnnouncementButton.addEventListener('click', () => {
        imagesInput.value = '';
      });
    }

    let mainNav = document.querySelector('#mainNav') as HTMLElement | null;
    let navContainer = document.querySelector('#navContainer') as HTMLElement | null;
    let upToTop = document.querySelector('.upToTop') as HTMLElement | null;

    if (mainNav && navContainer && upToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
          mainNav?.classList.add('shadow');
          navContainer?.classList.add('navscale');
          upToTop?.classList.remove('d-none');
        } else {
          mainNav?.classList.remove('shadow');
          navContainer?.classList.remove('navscale');
          upToTop?.classList.add('d-none');
        }
      });
    }
  }

  private loadRequestAdminCount(): void {
    this.http.get<responseRequestAdminCount>('http://localhost:5067/AdminRequest/GetAllCount', { observe: "response"}).subscribe(
      (response) => {
        this.requestAdminCount = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  private loadCategories(): void {
    this.http.get<responseCategory>('http://localhost:5067/api/ProductCategory/GetAll', { observe: "response"}).subscribe(
      (response) => {
        this.categories = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }
}

export interface Category {
  productCategoryId: number;
  name: string;
  img: string;
}

export interface responseCategory {
  data: Category[];
  success: boolean;
  message: string;
}

export interface responseRequestAdminCount {
  data: number;
  success: boolean;
  message: string;
}
