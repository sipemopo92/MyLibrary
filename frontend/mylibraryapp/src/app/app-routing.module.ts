import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { GetBooksComponent } from './components/main/get-books/get-books.component';
import { RouteGuardService } from './services/route-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [RouteGuardService],
    canActivateChild: [RouteGuardService],
    children: [
      {
        path: '',
        redirectTo: 'getbooks',
        pathMatch: 'full'
      },
      {
        path: 'getbooks',
        component: GetBooksComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
