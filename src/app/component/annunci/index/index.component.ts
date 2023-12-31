import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { Router, RouterConfigOptions } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

import { Product, Like, responseLike, responseProduct} from '../../../model/models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  searchText: string = '';
  likeColor: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.filteraProdotti();
  }

  filteraProdotti() {
    this.loadProducts(); // Ricarica tutti i prodotti quando il testo di ricerca cambia
  }

  products: Product[] | undefined = [];
  paginator!: MatPaginator;
  filteredArray: any[] | undefined = [];

  defaultRecords: any = 12;
  likeId: number | null = null; // Aggiunto per gestire l'ID del like

  loadPageData(pageIndex: number, pageSize: number) {
    if (this.products) {
      const startIndex = pageIndex * pageSize;
      let endIndex = startIndex + pageSize;
      if (endIndex > this.products.length) {
        endIndex = this.products.length;
      }

      if (this.searchText) {
        this.pageslice = this.products
          .filter((prodotto) =>
            prodotto.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .slice(startIndex, endIndex);
      } else {
        this.pageslice = this.products.slice(startIndex, endIndex);
      }
    }
  }

  onPaginateChange(dati: PageEvent) {
    this.loadPageData(dati.pageIndex, dati.pageSize);
  }

  constructor(private http: HttpClient, private router: Router, public BasicAuth: AuthService) { }


  ngOnInit(): void {
    this.loadlikes();
    this.loadProducts(); // Chiamata per caricare i prodotti iniziali
  }

  checkLike(productId: number): boolean{
    if((this.likes?.find(p => productId == p.productId))!= undefined){
      return true;
    } else return false ;
  }


  loadProducts() {
    this.http
      .get<responseProduct>('http://localhost:5067/api/Product/GetAll', {
        observe: 'response',
      })
      .subscribe(
        (response) => {
          this.products = response.body?.data;

          if (this.searchText) {
            // Filtra i prodotti solo se c'è un testo di ricerca
            this.pageslice = this.products!.filter((prodotto) =>
              prodotto.name
                .toLowerCase()
                .includes(this.searchText.toLowerCase())
            );
          } else {
            this.pageslice = this.products; // Nessun testo di ricerca, mostra tutti i prodotti
          }

          // Imposta la paginazione iniziale o dopo la ricerca
          this.onPageChange({
            pageIndex: 0,
            pageSize: this.defaultRecords,
            length: this.pageslice!.length,
          });
        },
        (error) => {
          console.error('Errore nel recupero dei dati:', error);
        }
      );
  }

  onPageChange(event: PageEvent) {
    if (this.products) {
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if (endIndex > this.pageslice!.length) {
        endIndex = this.pageslice!.length;
      }
      this.pageslice = this.pageslice!.slice(startIndex, endIndex);
    }
  }

  likes: Like[] | undefined = [];


  private loadlikes(): void {
    this.http.get<responseLike>('http://localhost:5067/Likes/GetAllLike', { observe: 'response' }).subscribe(
      (response) => {
        this.likes = response.body?.data;
        console.log('Fetched likes:', this.likes);
      },
      (error: HttpErrorResponse) => {
        console.error('Errore nel recupero dei dati:', error);
        //alert() inserire messaggio di errore dal back
        //alert('ciaociao' + error.message);
      }

    );
  }

  public pageslice: Product[] | undefined= [];
  liked: boolean = false;

  unlike(productId: number): void {
    if (this.likeId !== null) {
      this.http.delete(`http://localhost:5067/Likes/${this.likeId}`).subscribe(
        () => {
          this.liked = false; // Imposta lo stato "mi piace" su false
          this.likeId = null; // Resetta l'ID del like
          // Aggiorna l'aspetto dell'icona a cuore vuoto
        },
        (error) => {
          console.error('Errore nell\'eliminazione del like:', error);
        }
      );
    }
  }
  deleteLike(likeId: number): void {
    this.http.delete(`http://localhost:5067/Likes/${likeId}`).subscribe(
      () => {
        // Eliminazione riuscita, ora ricarica i like
        this.loadlikes(); // Aggiorna l'elenco dei like dopo l'eliminazione
      },
      (error) => {
        console.error('Errore nell\'eliminazione del like:', error);
      }
    );
  }

  like(
    productName: string,
    price: string,
    userId: number,
    productId: number,
    categoryName: string
  ): void {
    const addlikedto = {
      productName: productName,
      price: price,
      productId: productId,
      categoryName: categoryName,
      userId: userId,
    };

    this.http
      .post<number>('http://localhost:5067/Likes/AddLike', addlikedto, {
        observe: 'response',
      })
      .subscribe(
        (response) => {
          console.log(response);
          if (response.body) {
            this.likeId = response.body; // Imposta l'ID del like
            this.liked = true; // Imposta lo stato "mi piace" su true
          }
        },
        (error) => {
          console.error('Errore nel recupero dei dati:', error);
        }
      );
  }

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




  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}


