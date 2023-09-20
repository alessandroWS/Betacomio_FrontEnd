import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/core/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { IndexComponent } from './component/annunci/index/index.component';
import { OrderListComponent } from './component/core/order-list/order-list.component';
import { ZonarevisioneComponent } from './component/core/zonarevisione/zonarevisione.component';
import { LikeComponent } from './component/action/like/like.component';
import { SinglepageComponent } from './component/annunci/singlepage/singlepage.component';
import { CategoryProductsComponent } from './component/annunci/category-products/category-products.component';
import { BuyComponent } from './component/action/buy/buy.component';
import { ErrorComponent } from './component/message/error/error.component';
import { CreateComponent } from './component/annunci/create/create.component';
import { SessionExpiredComponent } from './component/session-expired/session-expired.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'zonarevisione', component: ZonarevisioneComponent },
  { path: 'singlepage/:productId', component: SinglepageComponent },
  { path: 'categoryProducts/:productCategoryId', component: CategoryProductsComponent },
  { path: 'like', component: LikeComponent },
  { path: 'buy/:productId', component: BuyComponent },
  { path: 'create', component: CreateComponent },
  { path: 'session-expired', component: SessionExpiredComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'not-found', component: ErrorComponent},
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
  hideFooter: boolean = false;
}
