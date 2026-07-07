import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDashboardComponent } from './shared/components/home-dashboard/home-dashboard.component';
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { ProductsDashboardComponent } from './shared/components/products-dashboard/products-dashboard.component';
import { FairsDashboardComponent } from './shared/components/fairs-dashboard/fairs-dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductComponent } from './shared/components/products-dashboard/product/product.component';
import { ProductFormComponent } from './shared/components/products-dashboard/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { GetConfirmComponent } from './shared/components/products-dashboard/product/get-confirm/get-confirm.component';
import { UserDetailsComponent } from './shared/components/user-dashboard/user-details/user-details.component';
import { UserFormComponent } from './shared/components/user-dashboard/user-form/user-form.component';
import {MatChipsModule} from '@angular/material/chips';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { FairDetailComponent } from './shared/components/fairs-dashboard/fair-detail/fair-detail.component';
import { FairCardComponent } from './shared/components/fairs-dashboard/fair-card/fair-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeDashboardComponent,
    UserDashboardComponent,
    ProductsDashboardComponent,
    FairsDashboardComponent,
    NavbarComponent,
    ProductComponent,
    ProductFormComponent,
    GetConfirmComponent,
    UserDetailsComponent,
    UserFormComponent,
    PageNotFoundComponent,
    AuthComponent,
    FairDetailComponent,
    FairCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
