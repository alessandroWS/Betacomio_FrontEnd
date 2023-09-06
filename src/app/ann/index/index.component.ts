import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  searchText: string = '';

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

  constructor(private http: HttpClient, public BasicAuth: AuthService) {}

  ngOnInit(): void {
    this.loadProducts(); // Chiamata per caricare i prodotti iniziali
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

  public pageslice: Product[] | undefined = [];
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
        this.loadProducts(); // Aggiorna l'elenco dei like dopo l'eliminazione
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
}

export interface ProductCategory {
  productCategoryId: number;
  name: string;
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
  ModifiedDate: Date;
  productCategory: ProductCategory;
}

export interface responseProduct {
  data: Product[];
  success: boolean;
  message: string;
}
