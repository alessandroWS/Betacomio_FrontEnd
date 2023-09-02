import { HttpClient } from '@angular/common/http';
import { Component,Input, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbarfilter',
  templateUrl: './navbarfilter.component.html',
  styleUrls: ['./navbarfilter.component.css']
})
export class NavbarFilterComponent implements OnInit {
  @Input() showMobileSearch: boolean = false // Imposta il valore predefinito a true


  enteredSearchValue= '';


  categories: Category[] | undefined = [];
  nAllReq: number | undefined = 0;
  isAdmin: boolean = false; // Aggiungi una variabile per memorizzare il valore "isAdmin"
  sIsAdmin: string = "";
  nReq: number | undefined = 0;
  constructor(private http: HttpClient, public BasicAuth: AuthService, public Logout: AuthService) {}

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();



onSearchTextChanged() {
  this.searchTextChanged.emit(this.enteredSearchValue);
}


  ngOnInit() {
    this.loadCategories();
    this.userRequestCount();
    // Verifica se l'utente è un amministratore
    const token = this.BasicAuth.getJwtToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
      this.isAdmin = decodedToken.IsAdmin === 'True'; // Imposta la variabile "isAdmin"

      this.sIsAdmin=this.isAdmin.valueOf.toString();
    }

    // Esegui la funzione loadRequestAdminCount solo se l'utente è un amministratore
    if (this.isAdmin) {
      this.getAllCount();
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

  private getAllCount(): void {
    this.http.get<responseRequestAdminCount>('http://localhost:5067/AdminRequest/GetAllCount', { observe: "response"}).subscribe(
      (response) => {
        this.nAllReq = response.body?.data;
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
      //
      //
      //
      //
  addReq(): void {
    this.http.post<any>('http://localhost:5067/AdminRequest/AddReq', {}).subscribe(
      (response) => {
        if (response.success) {

          this.userRequestCount();
          window.location.reload();
          // La richiesta è stata eseguita con successo, puoi mostrare un messaggio di successo o eseguire altre azioni
        } else {
          // La richiesta è fallita, puoi mostrare un messaggio di errore o eseguire altre azioni
          console.error('Richiesta di amministratore fallita:', response.message);
        }
      },
      (error) => {
        console.error('Errore durante la richiesta di amministratore:', error);
      }
    );
  }
  deleteReq(): void {
    this.http.delete<any>('http://localhost:5067/AdminRequest/DeleteReq').subscribe(
      (response) => {
        if (response.success) {
          console.log('Richiesta eliminata con successo.');
          // this.getAllCount();
          this.userRequestCount();

          window.location.reload();
        } else {
          // La richiesta di eliminazione è fallita, puoi mostrare un messaggio di errore o eseguire altre azioni
          console.error('Eliminazione richiesta fallita:', response.message);

          window.location.reload();
        }
      },
      (error) => {

        console.error("Errore durante l'eliminazione della richiesta:", error);

        window.location.reload();
      }
    );
  }
  private userRequestCount(): void {
    this.http.get<responseRequestAdminCount>('http://localhost:5067/AdminRequest/UserRequestCount', { observe: 'response' }).subscribe(
      (response) => {
        this.nReq = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero del conteggio delle richieste:', error);
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
