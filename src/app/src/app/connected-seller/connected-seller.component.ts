import { Component, OnInit } from '@angular/core';
declare var Stripe: any;

@Component({
  selector: 'app-connected-seller',
  templateUrl: './connected-seller.component.html',
  styleUrls: ['./connected-seller.component.css']
})
export class ConnectedSellerComponent implements OnInit{
  stripe: any;

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_51OvQL1JeISkzjGkfSTrBn7LnfxK1m6KxfMhOGjovxnXib39jt0IsnCmat0o5O20vImghVfPiWIOgwOm0KfVrV7rZ00seX3K6Jh');  }


   
    
createToken(): void {
  const accountInfo = {
    individual: {
      first_name: (document.getElementById('first-name') as HTMLInputElement).value,
      last_name: (document.getElementById('last-name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      ssn_last_4: (document.getElementById('ssn-last-4') as HTMLInputElement).value,
      dob: {
        day: (document.getElementById('dob-day') as HTMLInputElement).value,
        month: (document.getElementById('dob-month') as HTMLInputElement).value,
        year: (document.getElementById('dob-year') as HTMLInputElement).value,
      },
    },
    tos_shown_and_accepted: true,
  };

  this.stripe.createToken('account', accountInfo).then((result: any) => {
    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Token:', result.token.id);
    }
  });

  }

}