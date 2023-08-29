// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';
import { Observable } from 'rxjs';
import { ServiceResponse, GetOrderDto } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5067/api/Order';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllOrders(): Observable<ServiceResponse<GetOrderDto[]>> {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      });
    return this.http.get<ServiceResponse<GetOrderDto[]>>(`${this.apiUrl}/GetAll`);
  }
}
