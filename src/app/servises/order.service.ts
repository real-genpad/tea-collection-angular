import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormValuesType} from "../types/form-values.type";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: FormValuesType) {
    return this.http.post<{success: number, message?: string}>('https://testologia.ru/order-tea', data);
  }
}
