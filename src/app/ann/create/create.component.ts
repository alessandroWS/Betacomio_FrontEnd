import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {



  annuncioForm: FormGroup;





  categories: Category[] | undefined = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.annuncioForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      standardCost: [0, Validators.min(0)],
      productCategoryName: ['', Validators.required],
      productCategoryId: [null]  // Aggiungi questa riga per l'ID della categoria
    });
  }
  ngOnInit(): void {
    this.loadCategories();
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

  submitForm() {


    this.http.post<Response>('http://localhost:5067/api/Product', this.annuncioForm.value).subscribe(
      (response) => {
        console.log(this.annuncioForm);

      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
        console.log(this.annuncioForm);

      }
    );

  }

  onCategoryChange(event: any) {
    const selectedCategoryName = event.target.value;
    const selectedCategory = this.categories?.find(category => category.name === selectedCategoryName);

    if (selectedCategory) {
      this.annuncioForm.patchValue({
        productCategoryId: selectedCategory.productCategoryId
      });
    }
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
  productId: number;
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
