// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginAuthGuardService } from './services/login-auth-guard.service';
// import { ConnectionComponent } from './pages/connection/connection.component';
// import { HomeComponent } from './pages/home/home.component';
// import { SplashPageComponent } from './pages/splash-page/splash-page.component';
// import { SearchComponent } from './pages/search/search.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: SplashPageComponent,
//   },
//   {
//     path: 'home',
//     component: HomeComponent,
//   },
//   {
//     path: 'article',
//     component: SearchComponent,
//   },
//   {
//     path: 'authentication',
//     component: ConnectionComponent,
//     canActivate: [LoginAuthGuardService],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './pages/connection/connection.component';
import { HomeComponent } from './pages/home/home.component';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { SearchComponent } from './pages/search/search.component';
// import { AdminComponent } from './pages/admin/admin.component'; // Supposez que vous avez une page d'administration

// Importez votre AdminAuthGuardService
// import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SplashPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'article',
    component: SearchComponent,
  },
  {
    path: 'authentication',
    component: ConnectionComponent,
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent, // Page d'administration
  //   canActivate: [AdminAuthGuardService], // Garde pour l'accès administratif
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
