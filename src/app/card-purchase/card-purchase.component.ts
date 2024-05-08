import { Component, OnInit } from '@angular/core';
import { Purchase } from '../purchase';
import { ServicePaymentService } from '../service-payment.service';
import { isValid, parseISO } from 'date-fns';

@Component({
  selector: 'app-card-purchase',
  templateUrl: './card-purchase.component.html',
  styleUrls: ['./card-purchase.component.css']
})
export class CardPurchaseComponent implements OnInit{
 

  purchases?: Purchase[];
  allPurchases?: Purchase[]; // Store all purchases for filtering

  constructor(private service: ServicePaymentService) {}

  ngOnInit(): void {
    this.service.getPurchases().subscribe({
      next: (data) => {
        this.allPurchases = data;
        this.purchases = data; // Initially show all purchases
      },
      error: (error) => console.error('Error fetching purchases:', error)
    });
  }

  filterPurchases(period: string): void {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
        break;
      case 'week':
        const dayOfWeek = now.getDay(); // Get current day of week (0 = Sunday)
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek); // Adjust to the start of the week
        break;
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
        break;
      default:
        this.purchases = this.allPurchases; // Reset filter
        return;
    }

    this.purchases = this.allPurchases?.filter(p => {
      if (p.dateEnrolled) { // Ensure dateEnrolled is not undefined
        const purchaseDate = new Date(p.dateEnrolled);
        return purchaseDate >= startDate && purchaseDate < new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      }
      return false; // Exclude purchases without a valid date
    });
  }

}
