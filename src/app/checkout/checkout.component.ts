import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup; 
  orderPlaced: boolean = false;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      street: [''],
      city: [''],
      postcode: [''],
      phone: [''],
      email: ['']
    });
  }

  placeOrder() {
    Swal.fire({
      icon: 'success',
      title: 'Congratulations!',
      text: 'Your order has been placed successfully!',
      confirmButtonText: 'OK'
    }).then(() => {
      this.resetForm();
      window.location.reload();
    });
  }

  resetForm() {
    this.checkoutForm.reset();
  }
}