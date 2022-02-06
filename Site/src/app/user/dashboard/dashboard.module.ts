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

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    ChangeFullnameComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangePhotoComponent,
    UserOrdersComponent
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule{

}
