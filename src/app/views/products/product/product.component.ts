import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../servises/products.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogType} from "../../../types/catalog.type";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: CatalogType;

  constructor(private productsService: ProductsService,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.product = {
      description: '',
      id: 0,
      image: '',
      price: 0,
      title: '',
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        this.productsService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

}
