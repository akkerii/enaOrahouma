import { Component, OnInit } from '@angular/core';
import { Purchase } from '../purchase';
import { ServicePaymentService } from '../service-payment.service';

@Component({
  selector: 'app-card-purchase',
  templateUrl: './card-purchase.component.html',
  styleUrls: ['./card-purchase.component.css']
})
export class CardPurchaseComponent implements OnInit{
  purchases?: Purchase[]; // This will hold the fetched purchases

  constructor(private service: ServicePaymentService) {}

  ngOnInit(): void {
    // Call the service to get purchases and assign the response to this.purchases
    this.service.getPurchases().subscribe({
      next: (data) => this.purchases = data,
      error: (error) => console.error('Error fetching purchases:', error)
      // Proper error handling is recommended here
    });
  }


}
