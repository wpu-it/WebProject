import {NgModule} from "@angular/core";
import {AuthApiService} from "./auth/auth-api.service";
import {FantoursApiService} from "./fantours/fantours-api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  providers: [
    AuthApiService,
    FantoursApiService
  ],
  exports: [],
  imports: [
    HttpClientModule
  ],
  declarations: []
})

export class ServicesApiModule{

}
