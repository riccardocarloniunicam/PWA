import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
import { UserDataResolver } from './services/user-data.resolver';
const routes: Routes = [
  { path: '', 
    redirectTo: 'tabs',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    pathMatch: 'full' },
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
    path: 'modal',
    canActivate: [HomeGuard],
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule),
   
  },
  {
    path: 'conversation',
    canActivate: [HomeGuard],
    loadChildren: () => import('./conversation/conversation.module').then( m => m.ConversationPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
