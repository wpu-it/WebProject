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
import {AddFantourComponent} from "./admin/admin-fantours/add-fantour/add-fantour.component";
import {UpdateFantourComponent} from "./admin/admin-fantours/update-fantour/update-fantour.component";
import {UpdateFantourPhotoComponent} from "./admin/admin-fantours/update-fantour-photo/update-fantour-photo.component";
import {AddNewsComponent} from "./admin/admin-news/add-news/add-news.component";
import {UpdateNewsComponent} from "./admin/admin-news/update-news/update-news.component";
import {UpdateNewsPhotoComponent} from "./admin/admin-news/update-news-photo/update-news-photo.component";
import {RemoveNewsComponent} from "./admin/admin-news/remove-news/remove-news.component";
import {RemoveFantourComponent} from "./admin/admin-fantours/remove-fantour/remove-fantour.component";
import {AdminFantoursComponent} from "./admin/admin-fantours/admin-fantours.component";
import {AdminNewsComponent} from "./admin/admin-news/admin-news.component";
import {AdminOrdersComponent} from "./admin/admin-orders/admin-orders.component";
import {UpdateOrderComponent} from "./admin/admin-orders/update-order/update-order.component";

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
    ],
    children: [
      {
        path: 'fantours',
        component: AdminFantoursComponent,
        children:[
          {
            path: 'add',
            component: AddFantourComponent
          },
          {
            path: 'edit/:id',
            component: UpdateFantourComponent
          },
          {
            path: 'edit/photo/:id',
            component: UpdateFantourPhotoComponent
          },
          {
            path: 'remove/:id',
            component: RemoveFantourComponent
          },
        ]
      },
      {
        path: 'news',
        component: AdminNewsComponent,
        children: [
          {
            path: 'add',
            component: AddNewsComponent,
          },
          {
            path: 'edit/:id',
            component: UpdateNewsComponent
          },
          {
            path: 'edit/photo/:id',
            component: UpdateNewsPhotoComponent
          },
          {
            path: 'remove/:id',
            component: RemoveNewsComponent
          }
        ]
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        children: [
          {
            path: 'edit/:id',
            component: UpdateOrderComponent
          }
        ]
      }
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
