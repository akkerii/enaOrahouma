import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var Stripe: any; 
import { ServicePaymentService } from '../service-payment.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-payment-int',
  templateUrl: './payment-int.component.html',
  styleUrls: ['./payment-int.component.css']
})
export class PaymentIntComponent implements OnInit {
//to add
//private loaderService!: LoaderService  // Add this line


  private stripe = Stripe('pk_test_51OvQL1JeISkzjGkfSTrBn7LnfxK1m6KxfMhOGjovxnXib39jt0IsnCmat0o5O20vImghVfPiWIOgwOm0KfVrV7rZ00seX3K6Jh'); // Use your Stripe publishable key
  private card: any;

  @ViewChild('cardElement') cardElementRef!: ElementRef;
//toadd
  constructor(private paymentService: ServicePaymentService , private router: Router,private loaderService: LoaderService) {}



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

  //to update

  initiatePayment(amount: number) {
    this.loaderService.show(); // Show the loader when the payment process starts
    console.log('Trying to show loader');
    console.log("hello");
  
    this.paymentService.createPaymentIntent(amount).subscribe({
      next: (response) => {
        console.log(response);
        const clientSecret = response.clientSecret;
  
        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Test User',
            },
          },
        }).then((result: any) => {
          if (result.error) {
            console.error(result.error.message);
            this.loaderService.hide(); // Hide the loader on error
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              const paymentId = result.paymentIntent.id;
  
              this.paymentService.createPurchase(1, 2, paymentId).subscribe({
                next: (res) => {
                  console.log(paymentId);
                  console.log('Purchase created:', res);
                  console.log('Payment succeeded!');
                  this.router.navigate(['/succeeded']);
                  this.loaderService.hide(); // Hide the loader on success
                },
                error: (err) => {
                  console.error('Error creating purchase:', err);
                  this.loaderService.hide(); // Hide the loader on error
                }
              });
            } else {
              this.loaderService.hide(); // Hide the loader if payment does not succeed
            }
          }
        });
      },
      error: (err) => {
        console.error('Error creating payment intent:', err);
        this.loaderService.hide(); // Hide the loader on error
      }
    });
  }

  // added for paryial checkout
  checkout(priceId: string) {
    this.paymentService.createCheckoutSession(priceId).subscribe({
      next: (session) => {
        window.location.href = session.url; // Redirect to Stripe's checkout page
      },
      error:
(err: any) => console.error('Error creating checkout session:', err)
});
}

plan=[ { name: "Basic Plan", description: "A great start to explore our service.", priceId: "price_1PE0gSJeISkzjGkf8Epz3FPu", customerId: "cus_PwOSVQxl0vwiof", price: 10 }]

subscribeToPlan(customerId: string, priceId: string) {
  this.loaderService.show();
  this.paymentService.createSubscription(customerId, priceId).subscribe({
      next: (response) => {
          console.log('Subscription created:', response);
          this.router.navigate(['/succeeded']);
          this.loaderService.hide();
      },
      error: (err) => {
          console.error('Error creating subscription:', err);
          this.loaderService.hide();
      }
  });
}




async handlePayment() {
  const { error, paymentMethod } = await this.stripe.createPaymentMethod({
    type: 'card',
    card: this.card
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('PaymentMethod:', paymentMethod);
    console.log('PaymentMethod:', paymentMethod);

    this.paymentService.attachPaymentMethod(paymentMethod.id,"cus_PwOSVQxl0vwiof");
  }
}


}
  

