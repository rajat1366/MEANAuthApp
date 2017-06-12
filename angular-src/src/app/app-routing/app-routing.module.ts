import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProfileComponent } from '../components/profile/profile.component';
import {AuthGuard} from '../guards/auth.guard';
import {AuthService} from '../services/auth.service';

const appRoutes: Routes = [
   {path:'',component:HomeComponent},
   {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [],
  
})
export class AppRoutingModule { }
