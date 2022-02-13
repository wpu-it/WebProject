import {NgModule} from "@angular/core";
import {NewsService} from "./news.service";
import {NewsComponent} from "./news.component";
import {NewComponent} from "./new/new.component";
import {NewsInfoComponent} from "./news-info/news-info.component";
import {SharedModule} from "../../shared.module";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    NewsComponent,
    NewComponent,
    NewsInfoComponent
  ],
  declarations: [
    NewsComponent,
    NewComponent,
    NewsInfoComponent
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule{

}
