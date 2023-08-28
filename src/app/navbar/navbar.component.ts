import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] | undefined = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();

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

export interface Category{
  productCategoryId: number;
  name: string;
  img: string;
}

export interface responseCategory {
  data: Category[],
  success: boolean,
  message: string
}

