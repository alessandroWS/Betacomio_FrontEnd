// order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { GetOrderDto, OldOders, ServiceResponse } from '../../../model/models';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: GetOrderDto[] = [];

  oldOders: OldOders[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getOldOrders();
  }

  getOrders(): void {
    this.orderService
      .getAllOrders()
      .subscribe((response: ServiceResponse<GetOrderDto[]>) => {
        if (response.success && response.data) {
          this.orders = response.data;
        } else {
          // Gestisci il messaggio di errore o comportati di conseguenza
          console.error('Failed to get orders:', response.message);
          //alert() inserire messaggio di errore dal back
        }
      });
  }

  getOldOrders(): void {
    this.orderService
      .getAllOldOrders()
      .subscribe((response: ServiceResponse<OldOders[]>) => {
        if (response.success && response.data) {
          this.oldOders = response.data;
        } else {
          // Gestisci il messaggio di errore o comportati di conseguenza
          console.error('Failed to get orders:', response.message);
          //alert() inserire messaggio di errore dal back
        }
      });
  }
}
