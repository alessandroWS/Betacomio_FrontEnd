import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent {

  searchText: string = '';
  productCategory: ProductCategory | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router, public BasicAuth: AuthService) { }

  ngOnInit(): void {
    this.loadlikes();
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('productCategoryId');
      if (productIdParam !== null) {
        this.productCategoryId = +productIdParam;
        console.log(this.productCategoryId);
      }
    });
    this.filterProducts(); // Chiamata per caricare i prodotti iniziali
    this.loadProductCategory();
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.filterProducts();
  }

  liked: boolean = false;

  deleteLike(likeId: number): void {
    this.http.delete(`http://localhost:5067/Likes/${likeId}`).subscribe(
      () => {
        // Eliminazione riuscita, ora ricarica i like
        this.loadProductCategory(); // Aggiorna l'elenco dei like dopo l'eliminazione
      },
      (error) => {
        console.error('Errore nell\'eliminazione del like:', error);
      }
    );
  }

  products: Product[] | undefined = [];
  productCategoryId: number | null = null;

  private loadProductCategory(): void {
    this.http.get<responseProductCategory>('http://localhost:5067/api/ProductCategory/' + this.productCategoryId, { observe: 'response' }).subscribe(
      (response) => {
        this.productCategory = response.body?.data;
        console.log(this.productCategory);
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  private filterProducts(): void {
    const apiUrl = this.searchText
      ? `http://localhost:5067/api/Product/category/${this.productCategoryId}?search=${this.searchText}`
      : `http://localhost:5067/api/Product/category/${this.productCategoryId}`;

    this.http.get<responseProduct>(apiUrl, { observe: 'response' }).subscribe(
      (response) => {
        this.products = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  likes: Like[] | undefined = [];

  manageLike(product : Product){
    console.log(document.getElementById(product.productId.toString())?.style.color);
    switch(document.getElementById(product.productId.toString())?.style.color){
      case 'red' :
        this.deleteLike(product.productId);
        document.getElementById(product.productId.toString())?.style.setProperty('color','grey');
        break;
      case 'grey':
        this.like(product.name, product.standardCost.toString(), 0, product.productId, product.productCategory.name);
        document.getElementById(product.productId.toString())?.style.setProperty('color','red');
        break;
      default:
        console.log('CODICE MALSANOOOO!');
        break;
    }
  }


  checkLike(productId: number): boolean{
    if((this.likes?.find(p => productId == p.productId))!= undefined){
      return true;
    } else return false ;
  }

  private loadlikes(): void {
    this.http.get<responseLike>('http://localhost:5067/Likes/GetAllLike', { observe: 'response' }).subscribe(
      (response) => {
        this.likes = response.body?.data;
        console.log('Fetched likes:', this.likes);
      },
      (error: HttpErrorResponse) => {
        console.error('Errore nel recupero dei dati:', error);
        //alert() inserire messaggio di errore dal back
      }

    );
  }


  like(productName: string, price: string, userId: number, productId: number, categoryName: string): void {
    const addlikedto = {
      productName: productName,
      price: price,
      productId: productId,
      userId: userId,
      categoryName: categoryName
    }

    this.http.post<Response>('http://localhost:5067/Likes', addlikedto, { observe: "response" }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}



export interface Product {
  productId: number;
  name: string;
  standardCost: number;
  ProductNumber: string;
  Color: string;
  ListPrice: number;
  Size: string;
  Weight: string;
  ProductCategoryID: number;
  ProductModelID: number;
  SellStartDate: Date;
  SellEndDate: Date;
  DiscontinuedDate: Date;
  ThumbNailPhoto: string;
  ThumbnailPhotoFileName: string;
  modifiedDate: Date;
  productCategory: ProductCategory;
}

export interface ProductCategory {
  productCategoryId: number;
  name: string;
}

export interface responseProduct {
  data: Product[];
  success: boolean;
  message: string;
}

export interface responseProductCategory {
  data: ProductCategory;
  success: boolean;
  message: string;
}



export interface Like {
  IdLike: number,
  productName: string,
  price: string,
  productId: number,
  categoryName: string
  userId: number
}

export interface responseLike {
  data: Like[],
  success: boolean,
  message: string
}
