import {NgModule} from "@angular/core";
import {AuthService} from "./auth.service";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SharedModule} from "../shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule{

}
