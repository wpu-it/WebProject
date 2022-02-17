import {NgModule} from "@angular/core";
import {OrdersService} from "./orders.service";
import {MakeOrderComponent} from "./make-order/make-order.component";
import {SharedModule} from "../../shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FantoursModule} from "../fantours/fantours.module";
import {OrderFantourComponent} from "./order-fantour/order-fantour.component";

@NgModule({
  exports: [
    OrderFantourComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    MakeOrderComponent,
    OrderFantourComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule{

}
