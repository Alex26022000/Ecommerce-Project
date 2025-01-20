import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(
    private orderHistoryService: OrderHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe((data) => {
      this.orderHistoryList = data._embedded.orders;
    });
  }

  viewOrderDetails(orderHistory: OrderHistory) {
    this.router.navigate(['/order-details', orderHistory.id]);
  }
}
