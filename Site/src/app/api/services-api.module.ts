import {NgModule} from "@angular/core";
import {AuthApiService} from "./auth/auth-api.service";
import {FantoursApiService} from "./fantours/fantours-api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UsersApiService} from "./users/users-api.service";

@NgModule({
  providers: [
    AuthApiService,
    FantoursApiService,
    UsersApiService
  ],
  exports: [],
  imports: [
    HttpClientModule
  ],
  declarations: []
})

export class ServicesApiModule{

}
