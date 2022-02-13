import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {FantoursModule} from "./user/fantours/fantours.module";
import {BrowserLocalStorage} from "./shared/storage/local-storage";
import {SharedModule} from "./shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";
import {DashboardModule} from "./user/dashboard/dashboard.module";
import {PicturesService} from "./pictures.service";
import {ErrorComponent} from "./error/error.component";
import {AdminAuthGuard} from "./shared/guards/admin-auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {QueryHttpInterceptor} from "./shared/http/query-http.interceptor";
import {CheckAdminGuard} from "./shared/guards/check-admin.guard";
import {NewsModule} from "./user/news/news.module";
import {OrdersModule} from "./user/orders/orders.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    SharedModule,
    AuthModule,
    AdminModule,
    UserModule
  ],
  providers: [
    BrowserLocalStorage,
    PicturesService,
    CheckAdminGuard,
    AdminAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QueryHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
