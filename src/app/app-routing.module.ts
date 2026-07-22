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
import { AuthComponent } from './shared/components/auth/auth.component';
import { FairDetailComponent } from './shared/components/fairs-dashboard/fair-detail/fair-detail.component';
import { AuthGuard } from './shared/services/auth.guard';
import { UserRoleGuard } from './shared/services/userRole.guard';
import { CanDeactivateGuard } from './shared/services/canDeactivate.guard';
import { NewProductsResolver } from './shared/services/new-products.resolver';
import { BlogDashboardComponent } from './shared/components/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './shared/components/blog-dashboard/blog-form/blog-form.component';
import { BlogDetailComponent } from './shared/components/blog-dashboard/blog-detail/blog-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeDashboardComponent,
    title: `Home`,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    }
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'products',
    component: ProductsDashboardComponent,
   
    canActivateChild:[AuthGuard,UserRoleGuard],
    resolve: {
      product: NewProductsResolver
    },
    title: `Products`,
    data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    },
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
         data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    },
      },
      {
        path: ':id',
        component: ProductComponent,
       data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    },
      },
      {
        path: ':id/edit',
        component: ProductFormComponent,
        canDeactivate: [CanDeactivateGuard],
         data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    },
      },
    ]
  },
  {
    path: 'fairs',
    component: FairsDashboardComponent,
    title: `Fairs`,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['superAdmin']
    },
    children: [
      {
        path: ':fairId',
        component: FairDetailComponent
      }
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivateChild: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['admin', 'superAdmin']
    },
    title: `User`,
    children: [

      {
        path: 'addUser',
        component: UserFormComponent,
        data: {
          userRoles: ['admin', 'superAdmin']
        }
      },
      {
        path: ':userId',
        component: UserDetailsComponent,
        data: {
          userRoles: ['admin', 'superAdmin']
        }
      },
      {
        path: ':userId/edit',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          userRoles: ['admin', 'superAdmin']
        }
      }
    ]
  },
  {
    path: 'blogs',
    component: BlogDashboardComponent
  },
    {
    path: 'blogs/addBlog',
    component: BlogFormComponent
  },
    {
    path: 'blogs/:id',
    component: BlogDetailComponent
  },
    {
    path: 'blogs/:id/edit',
    component: BlogFormComponent
  },
  {
    path: 'Page-Not-Found',
    component: PageNotFoundComponent,
    data: {
      msg: `Page not found using static data !!!`
    }
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
