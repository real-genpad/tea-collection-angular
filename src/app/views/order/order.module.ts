import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {OrderService} from "../../servises/order.service";
import {OrderComponent} from "./order.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    OrderRoutingModule
  ],
  exports: [
    OrderRoutingModule
  ],
  providers: [OrderService]
})
export class OrderModule { }
