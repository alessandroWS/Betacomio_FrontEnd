import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './ann/index/index.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ZonarevisioneComponent } from './zonarevisione/zonarevisione.component';
import { LikeComponent } from './like/like.component';
import { SinglepageComponent } from './ann/singlepage/singlepage.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'zonarevisione', component: ZonarevisioneComponent },
  { path: 'singlepage/:productId', component: SinglepageComponent },
  { path: 'like', component: LikeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
