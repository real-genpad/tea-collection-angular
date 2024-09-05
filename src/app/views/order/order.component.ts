import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../servises/order.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup = new FormGroup({
    product: new FormControl(''),
    comment: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]),
    country: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Я0-9\s\-/]+$/)]),
  })

  get name() {return this.orderForm.get('name');}
  get lastname() {return this.orderForm.get('last_name');}
  get phone() {return this.orderForm.get('phone');}
  get country() {return this.orderForm.get('country');}
  get zip() {return this.orderForm.get('zip');}
  get address() {return this.orderForm.get('address');}

  showSuccessMessage: boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
               private orderService: OrderService,
               private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['title']) {
        this.orderForm.get('product')?.setValue(params['title']);
      }
    })
  }

  createOrder(): void {
    this.orderForm.markAllAsTouched();
    this.orderForm.updateValueAndValidity();
    if(this.orderForm.valid) {
      const orderData = this.orderForm.getRawValue();
      this.orderService.createOrder(orderData)
        .subscribe(response => {
          if(response.success === 1){
            this.showSuccessMessage = true;
          } else {
            console.error('Ошибка:', response.message);
            this.router.navigate(['/']);
          }
        })
    }

  }
}
