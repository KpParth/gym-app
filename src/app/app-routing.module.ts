import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CustomerDashboardComponent } from './customer-panel/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  // { path: '', component: AdminDashboardComponent },CustomerDashboardComponent
  {
    path:'',
    component: MainLayoutComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'customer-dashboard', component: CustomerDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
