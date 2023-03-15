import {NgModule} from "@angular/core";
import {AuthApiService} from "./auth/auth-api.service";
import {FantoursApiService} from "./fantours/fantours-api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UsersApiService} from "./users/users-api.service";
import {NewsApiService} from "./news/news-api.service";
import {OrdersApiService} from "./orders/orders-api.service";
import {OrdersDiagramApiService} from "./orders-diagram/orders-diagram-api.service";

@NgModule({
  providers: [
    AuthApiService,
    FantoursApiService,
    UsersApiService,
    NewsApiService,
    OrdersApiService,
    OrdersDiagramApiService
  ],
  exports: [],
  imports: [
    HttpClientModule
  ],
  declarations: []
})

export class ServicesApiModule{

}
