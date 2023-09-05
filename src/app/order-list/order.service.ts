// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';
import { Observable } from 'rxjs';
import { ServiceResponse, GetOrderDto, OldOders } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5067/api/Order';
  private apiOldUrl = 'http://localhost:5067/api/OldOrder';


  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllOrders(): Observable<ServiceResponse<GetOrderDto[]>> {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      });
    return this.http.get<ServiceResponse<GetOrderDto[]>>(`${this.apiUrl}/GetAll`);
  }

  getAllOldOrders(): Observable<ServiceResponse<OldOders[]>> {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      });
    return this.http.get<ServiceResponse<OldOders[]>>(`${this.apiOldUrl}/GetAll`);
  }
}
