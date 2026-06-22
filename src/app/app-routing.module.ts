import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './shared/components/home-dashboard/home-dashboard.component';
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { ProductsDashboardComponent } from './shared/components/products-dashboard/products-dashboard.component';
import { FairsDashboardComponent } from './shared/components/fairs-dashboard/fairs-dashboard.component';
import { ProductComponent } from './shared/components/products-dashboard/product/product.component';
import { ProductFormComponent } from './shared/components/products-dashboard/product-form/product-form.component';
import { UserFormComponent } from './shared/components/user-dashboard/user-form/user-form.component';
import { UserDetailsComponent } from './shared/components/user-dashboard/user-details/user-details.component';

const routes: Routes = [

  {
    path : 'home',
    component : HomeDashboardComponent
  },
    {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
   {
    path : 'products',
    component : ProductsDashboardComponent
  },
   {
    path : 'products/addProduct',
    component : ProductFormComponent
  },
   {
    path : 'products/:id',
    component : ProductComponent
  },
   {
    path : 'products/:id/edit',
    component : ProductFormComponent
  },
   {
    path : 'fairs',
    component : FairsDashboardComponent
  },
    {
    path : 'user',
    component : UserDashboardComponent
  },
   {
    path : 'user/addUser',
    component : UserFormComponent
  },
   {
    path : 'user/:userId',
    component : UserDetailsComponent
  },
   {
    path : 'user/:userId/edit',
    component : UserFormComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
