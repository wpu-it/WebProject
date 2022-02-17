import {NgModule} from "@angular/core";
import {UsersService} from "./users.service";
import {DashboardComponent} from "./dashboard.component";
import {SharedModule} from "../../shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {ChangeFullnameComponent} from "./change-fullname/change-fullname.component";
import {ChangeEmailComponent} from "./change-email/change-email.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChangePhotoComponent} from "./change-photo/change-photo.component";
import {UserOrdersComponent} from "./user-orders/user-orders.component";
import {UserOrderComponent} from "./user-orders/user-order/user-order.component";
import {UpdateUserOrderComponent} from "./user-orders/update-user-order/update-user-order.component";
import {OrdersModule} from "../orders/orders.module";

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    OrdersModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    ChangeFullnameComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangePhotoComponent,
    UserOrdersComponent,
    UserOrderComponent,
    UpdateUserOrderComponent
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule{

}
