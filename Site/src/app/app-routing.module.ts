import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FantoursComponent} from "./user/fantours/fantours.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./user/dashboard/dashboard.component";
import {ErrorComponent} from "./error/error.component";
import {AdminAuthGuard} from "./shared/guards/admin-auth.guard";
import {CheckAdminGuard} from "./shared/guards/check-admin.guard";
import {ChangeFullnameComponent} from "./user/dashboard/change-fullname/change-fullname.component";
import {ChangeEmailComponent} from "./user/dashboard/change-email/change-email.component";
import {ChangePasswordComponent} from "./user/dashboard/change-password/change-password.component";
import {ChangePhotoComponent} from "./user/dashboard/change-photo/change-photo.component";
import {UserOrdersComponent} from "./user/dashboard/user-orders/user-orders.component";

const routes: Routes = [
  {
    path: '',
    component: FantoursComponent,
    canActivate: [
      CheckAdminGuard
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      AdminAuthGuard
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'edit/fullname',
        component: ChangeFullnameComponent
      },
      {
        path: 'edit/email',
        component: ChangeEmailComponent
      },
      {
        path: 'edit/password',
        component: ChangePasswordComponent
      },
      {
        path: 'edit/photo',
        component: ChangePhotoComponent
      },
      {
        path: 'orders/:userId',
        component: UserOrdersComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [
      CheckAdminGuard
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
