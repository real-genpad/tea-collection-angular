import { Injectable } from '@angular/core';
import {CatalogType} from "../types/catalog.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<CatalogType[]> {
    return this.http.get<CatalogType[]>('https://testologia.ru/tea')
  }

  getProduct(id: number): Observable<CatalogType> {
    return this.http.get<CatalogType>(`https://testologia.ru/tea?id=${id}`)
  }
}
