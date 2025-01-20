// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderHistory } from 'src/app/common/order-history';
// import { OrderHistoryService } from 'src/app/services/order-history.service';

// @Component({
//   selector: 'app-order-details',
//   templateUrl: './order-details.component.html',
//   styleUrls: ['./order-details.component.css'],
// })
// export class OrderDetailsComponent implements OnInit {
//   orderId: string;
//   orderHistory: OrderHistory;

//   constructor(
//     private route: ActivatedRoute,
//     private orderHistoryService: OrderHistoryService
//   ) {}

//   ngOnInit(): void {
//     // Obținem orderId din parametrii rutei
//     this.orderId = this.route.snapshot.paramMap.get('id');
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderHistory!: OrderHistory;

  constructor(
    private route: ActivatedRoute,
    private orderHistoryService: OrderHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleOrderDetails();
    });
  }

  handleOrderDetails() {
    const orderId: string = this.route.snapshot.paramMap.get('id')!;
    this.getOrderDetails(orderId);
  }

  getOrderDetails(orderId: string) {
    this.orderHistoryService.getOrder(orderId).subscribe((data) => {
      this.orderHistory = data;
    });
  }

  goBack() {
    this.router.navigate(['/order-history']);
  }
}
