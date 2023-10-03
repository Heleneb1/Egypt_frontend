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
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { QuizViewComponent } from './pages/quiz-view/quiz-view.component';
import { QuizDetailsComponent } from './pages/quiz-details/quiz-details.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { BadgesModalComponent } from './components/badges-modal/badges-modal.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
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
    path: 'article/:id',
    component: ArticleDetailsComponent,
  },
  {
    path: 'create-quiz',
    component: CreateQuizComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },

  {
    path: 'authentication',
    component: ConnectionComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    component: QuizViewComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizDetailsComponent,
  },
  {
    path: 'inscription',
    component: RegisterComponent,
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
export class AppRoutingModule { }
