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
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeDashboardComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsDashboardComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent
      },
      {
        path: ':id',
        component: ProductComponent
      },
      {
        path: ':id/edit',
        component: ProductFormComponent
      },
    ]
  },
  {
    path: 'fairs',
    component: FairsDashboardComponent
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    children : [
      
  {
    path: 'addUser',
    component: UserFormComponent
  },
  {
    path: ':userId',
    component: UserDetailsComponent
  },
  {
    path: ':userId/edit',
    component: UserFormComponent
  }
    ]
  },
  {
    path: 'Page-Not-Found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'Page-Not-Found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
