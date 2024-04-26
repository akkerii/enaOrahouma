import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var Stripe: any; 
import { ServicePaymentService } from '../service-payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-int',
  templateUrl: './payment-int.component.html',
  styleUrls: ['./payment-int.component.css']
})
export class PaymentIntComponent implements OnInit {
  private stripe = Stripe('pk_test_51OvQL1JeISkzjGkfSTrBn7LnfxK1m6KxfMhOGjovxnXib39jt0IsnCmat0o5O20vImghVfPiWIOgwOm0KfVrV7rZ00seX3K6Jh'); // Use your Stripe publishable key
  private card: any;

  @ViewChild('cardElement') cardElementRef!: ElementRef;

  constructor(private paymentService: ServicePaymentService , private router: Router) {}



  amount  : number =0;


  ngOnInit() {

    this.paymentService.getCourse(3).subscribe((course: { price: any; }) => {
       this.amount=  course.price * 100 ;
       console.log(this.amount);

     }

    );


    console.log('Card element ref:', this.cardElementRef.nativeElement);
   

    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElementRef.nativeElement);
  }

  ngAfterViewInit() {
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElementRef.nativeElement);
  }

  initiatePayment(amount: number) {
    console.log("hello");
    this.paymentService.createPaymentIntent(amount).subscribe(response => {
      console.log(response);
      const clientSecret = response.clientSecret;
      this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,  
          billing_details: {
            name: 'Test User',
          },
        },
      })
      .then((result: any) => {
        if (result.error) {
          console.error(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            const  paymentId = result.paymentIntent.id ; 

            this.paymentService.createPurchase(1, 2,paymentId).subscribe({
              next: (res) => {
                console.log(paymentId);
                console.log('Purchase created:', res);
                console.log('Payment succeeded!');
                this.router.navigate(['/succeeded']); 

              },
              error: (err) => {
                console.error('Error creating purchase:', err);
              }
            });
           
           

          }
        }
      });
    });
  }
}
