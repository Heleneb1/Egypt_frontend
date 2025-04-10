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
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardService } from './services/admin-guard.service';
import { BadgesModalComponent } from './components/badges-modal/badges-modal.component';
import { ViewComponent } from './components/view/view.component';
import { TopicsComponent } from './components/topics/topics.component';
import { GCUComponent } from './components/gcu/gcu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';

//TODO lazy loading
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
    path: 'badges',
    component: BadgesModalComponent,
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
    path: 'article-details/:slug', //pas /:slug directement après article/ car il ne différencie pas entre id et slug (les strings)
    component: ArticleDetailsComponent
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
    path: 'topics',
    component: TopicsComponent,
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
    path: 'loading',
    component: UserProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'view',
    component: ViewComponent,
  },
  {
    path: 'gcu',
    component: GCUComponent,
  },
  {
    path: 'social-networks',
    component: SocialNetworksComponent,

  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload' })], // onSameUrlNavigation permet de rechager la page même url
  exports: [RouterModule],
})
export class AppRoutingModule { }
