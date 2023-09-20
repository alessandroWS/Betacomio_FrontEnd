import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// Component
// core
import { HomeComponent } from './component/core/home/home.component';
import { NavbarComponent } from './component/core/navbar/navbar/navbar.component';
import { NavbarFilterComponent } from './component/core/navbar/navbarfilter/navbarfilter.component';
import { ZonarevisioneComponent } from './component/core/zonarevisione/zonarevisione.component';
import { FooterComponent } from './component/core/footer/footer.component';

// auth
import { RegisterComponent } from './component/auth/register/register.component';
import { LoginComponent } from './component/auth/login/login.component';
import { AuthInterceptor } from './component/auth/auth.interceptor';
import { AuthService } from './service/auth.service';

// annunci
import { IndexComponent } from './component/annunci/index/index.component';
import { CategoryProductsComponent } from './component/annunci/category-products/category-products.component';
import { OrderListComponent } from './component/core/order-list/order-list.component';
import { SinglepageComponent } from './component/annunci/singlepage/singlepage.component';
import { CreateComponent } from './component/annunci/create/create.component';

import { MatPaginatorModule } from '@angular/material/paginator';

// action
import { LikeComponent } from './component/action/like/like.component';
import { BuyComponent } from './component/action/buy/buy.component';

// message
import { ErrorComponent } from './component/message/error/error.component';
import { ModalComponent } from './component/message/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OkModalComponent } from './component/message/ok-modal/ok-modal.component';

import { SessionExpiredComponent } from './component/session-expired/session-expired.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JwtModule } from '@auth0/angular-jwt';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NavbarFilterComponent,
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
    CategoryProductsComponent,
    BuyComponent,
    FooterComponent,
    ErrorComponent,
    CreateComponent,
    ModalComponent,
    OkModalComponent,
    SessionExpiredComponent,

  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Funzione per ottenere il token dalla tua sorgente (es. localStorage)
        allowedDomains: ['example.com'], // Domini consentiti (opzionale)
        disallowedRoutes: ['example.com/api/auth'], // Rotte escluse (opzionale)
      },
    }),
    MatPaginatorModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // Aggiungi un provider per recuperare il token JWT dalla local storage
    {
      provide: 'LOCAL_STORAGE',
      useValue: window.localStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
