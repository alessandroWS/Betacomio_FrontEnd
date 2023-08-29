// order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { GetOrderDto, ServiceResponse } from './order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: GetOrderDto[] = [];

  constructor(private orderService: OrderService) { }
  
  loadOrders(): void {
    // Carica gli ordini quando l'utente clicca sul pulsante
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllOrders().subscribe((response: ServiceResponse<GetOrderDto[]>) => {
      if (response.success && response.data) {
        this.orders = response.data;
      } else {
        // Gestisci il messaggio di errore o comportati di conseguenza
        console.error('Failed to get orders:', response.message);
      }
    });
  }
}