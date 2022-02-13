import {NgModule} from "@angular/core";
import {UserMainComponent} from "./user-main.component";
import {FantoursModule} from "./fantours/fantours.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {NewsModule} from "./news/news.module";
import {OrdersModule} from "./orders/orders.module";
import {SharedModule} from "../shared.module";
import {AppRoutingModule} from "../app-routing.module";
import {SortingComponent} from "./sorting/sorting.component";

@NgModule({
  imports:[
    SharedModule,
    AppRoutingModule,
    FantoursModule,
    DashboardModule,
    NewsModule,
    OrdersModule
  ],
  exports: [
    UserMainComponent
  ],
  declarations:[
    UserMainComponent,
    SortingComponent
  ],
  providers:[]
})
export class UserModule{

}
