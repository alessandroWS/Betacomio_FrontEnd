import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AOS from 'aos'; // Supponendo che 'aos' sia importabile da ES6
import { Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'

SwiperCore.use([Autoplay]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] | undefined = [];
  categories: Category[] | undefined = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initializeSwiper();
    this.initializeAOS();
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
        this.products = response.body?.data.slice(-6);
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

export interface Category{
  productCategoryId: number;
  name: string;
  img: string;
}

export interface ProductCategory {
  productCategoryId : number;
  name : string;
}

export interface Product {
  ProductID: number;
  name: string;
  standardCost: number;
  ProductNumber: string;
  Color:string;
  ListPrice:number;
  Size:string;
  Weight: string;
  ProductCategoryID:number;
  ProductModelID:number;
  SellStartDate: Date;
  SellEndDate: Date;
  DiscontinuedDate: Date;
  ThumbNailPhoto: string;
  ThumbnailPhotoFileName: string;
  productCategory: ProductCategory
}

export interface responseProduct {
  data: Product[],
  success: boolean,
  message: string
}

export interface responseCategory {
  data: Category[],
  success: boolean,
  message: string
}
