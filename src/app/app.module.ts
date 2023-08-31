import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HTTP_INTERCEPTORS
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './ann/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { SinglepageComponent } from './ann/singlepage/singlepage.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AuthInterceptor } from './auth.interceptor';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ZonarevisioneComponent } from './zonarevisione/zonarevisione.component';
import { LikeComponent } from './like/like.component';
import { CategoryProductsComponent } from './ann/category-products/category-products.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    IndexComponent,
    SinglepageComponent,
    OrderListComponent,
    ZonarevisioneComponent,
    LikeComponent,
    CategoryProductsComponent
  ],
  imports: [
    MatPaginatorModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, // Usa il tuo interceptor
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
