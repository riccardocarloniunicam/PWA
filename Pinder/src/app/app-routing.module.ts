import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
import { InfoGuard } from './guards/info.guard';
const routes: Routes = [
  { path: '', 
    redirectTo: 'welcome',
    canActivate: [InfoGuard],
    pathMatch: 'full' 
  },
  {
    path: 'login',
    canActivate: [IndexGuard],
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [IndexGuard],
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    canActivate: [HomeGuard],
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    canActivate: [InfoGuard],
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
