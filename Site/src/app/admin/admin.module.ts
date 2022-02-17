import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../shared.module";
import {AdminFantoursComponent} from "./admin-fantours/admin-fantours.component";
import {AdminFantourComponent} from "./admin-fantours/admin-fantour/admin-fantour.component";
import {AddFantourComponent} from "./admin-fantours/add-fantour/add-fantour.component";
import {AppRoutingModule} from "../app-routing.module";
import {UpdateFantourComponent} from "./admin-fantours/update-fantour/update-fantour.component";
import {UpdateFantourPhotoComponent} from "./admin-fantours/update-fantour-photo/update-fantour-photo.component";
import {AdminNewsComponent} from "./admin-news/admin-news.component";
import {AddNewsComponent} from "./admin-news/add-news/add-news.component";
import {AdminNewComponent} from "./admin-news/admin-new/admin-new.component";
import {UpdateNewsComponent} from "./admin-news/update-news/update-news.component";
import {UpdateNewsPhotoComponent} from "./admin-news/update-news-photo/update-news-photo.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import {AdminOrderComponent} from "./admin-orders/admin-order/admin-order.component";
import {UpdateOrderComponent} from "./admin-orders/update-order/update-order.component";

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
    exports: [
        UpdateOrderComponent
    ],
  declarations: [
    AdminComponent,
    AdminFantoursComponent,
    AdminFantourComponent,
    AddFantourComponent,
    UpdateFantourComponent,
    UpdateFantourPhotoComponent,
    AdminNewsComponent,
    AddNewsComponent,
    AdminNewComponent,
    UpdateNewsComponent,
    UpdateNewsPhotoComponent,
    AdminOrdersComponent,
    AdminOrderComponent,
    UpdateOrderComponent
  ],
  providers: []
})
export class AdminModule{

}
