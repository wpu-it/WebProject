import {NgModule} from "@angular/core";
import {FantoursComponent} from "./fantours.component";
import {FantoursService} from "./fantours.service";
import {EnvironmentModel} from "../../../environments/environment.model";
import {environment} from "../../../environments/environment";
import {ServicesApiModule} from "../../api/services-api.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FantourComponent} from "./fantour/fantour.component";
import {SharedModule} from "../../shared.module";

@NgModule({
  declarations: [
    FantoursComponent,
    FantourComponent
  ],
  imports: [
    AppRoutingModule,
    ServicesApiModule,
    SharedModule
  ],
  exports: [
    FantoursComponent
  ],
  providers: [
    FantoursService,
    {
      provide: EnvironmentModel,
      useValue: environment
    }
  ]
})
export class FantoursModule{

}
