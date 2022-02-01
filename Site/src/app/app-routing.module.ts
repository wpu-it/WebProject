import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FantoursComponent} from "./user/fantours/fantours.component";

const routes: Routes = [
  {
    path: '',
    component: FantoursComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
