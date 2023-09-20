import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AOS from 'aos'; // Supponendo che 'aos' sia importabile da ES6
import { Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

import { Product, Category, responseCategory, responseProduct } from '../../../model/models'; // Assicurati di utilizzare il percorso corretto

SwiperCore.use([Autoplay]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] | undefined = [];
  categories: Category[] | undefined = [];

  logNum: number = 0;
  regNum: number = 0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public BasicAuth: AuthService, public Logout: AuthService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initializeSwiper();
    this.initializeAOS();


    this.logNum = 0;


    this.route.queryParams.subscribe(params => {
      if (params['log'] === 'Logged in') {
        //this.showLogMessage = true;
        this.logNum = 1;
        setTimeout(() => {

          this.logNum = 0;
        }, 5000);


      }
      else if(params['log'] === 'Logged out') {
        // Reimposta loginFailed a false al refresh della pagina
        //this.showLogMessage = false;

        this.logNum = 2;
        setTimeout(() => {

          this.logNum = 0;
        }, 5000);

      }
    });


    this.route.queryParams.subscribe(params => {
      if (params['reg'] === 'success reg') {
        //this.showLogMessage = true;
        this.regNum = 1;
        setTimeout(() => {

          this.regNum = 0;
        }, 5000);


      }
    });

  }


  //  this.products = response.body?.data.slice(-5);

  private loadCategories(): void {
    this.http.get<responseCategory>('http://localhost:5067/api/ProductCategory/GetAll', { observe: "response"}).subscribe(
      (response) => {
        this.categories = response.body?.data;
        console.log(this.products);
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  private loadProducts(): void {
    this.http.get<responseProduct>('http://localhost:5067/api/Product/GetAll', { observe: "response"}).subscribe(
      (response) => {
        this.products = response.body?.data.slice(0,6);
        console.log(this.products);
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  private initializeSwiper(): void {
    const swiper = new SwiperCore('.mySwiper', {
      grabCursor: true,
      centeredSlides: false,
      loop: true,
      spaceBetween: 40,
      modules: [Autoplay],
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });



    // Aggiungi eventi per mettere in pausa e riprendere l'autoplay al passaggio del mouse
    swiper.el.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });

    swiper.el.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  }




  private initializeAOS(): void {
    AOS.init({
      delay: 500,
      easing: 'linear',
      offset: 10,
    });
  }
}
