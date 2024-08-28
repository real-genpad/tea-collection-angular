import {Component, OnInit} from '@angular/core';
import {CatalogType} from "../../../types/catalog.type";
import {Router} from "@angular/router";
import {ProductsService} from "../../../servises/products.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  catalog: CatalogType[] = [];

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.catalog = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }
}
