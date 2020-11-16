import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './util/app.guard';


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {path: 'home', component: HomeComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
