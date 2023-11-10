import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
// import { AnimationComponent } from './components/animation/animation.component';
import { SearchComponent } from './pages/search/search.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuillModule } from 'ngx-quill';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { QuizViewComponent } from './pages/quiz-view/quiz-view.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { QuizDetailsComponent } from './pages/quiz-details/quiz-details.component';
import { DatePipe } from '@angular/common';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { BadgesModalComponent } from './components/badges-modal/badges-modal.component';
import { ArticlesCarouselComponent } from './components/articles-carousel/articles-carousel.component';
import { ContactComponent } from './components/contact/contact.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageQuizComponent } from './components/manage-quiz/manage-quiz.component';
import { ManageArticleComponent } from './components/manage-article/manage-article.component';
import { ManageQuestionComponent } from './components/manage-question/manage-question.component';
import { ManageBadgesComponent } from './components/manage-badges/manage-badges.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageCommentsComponent } from './components/manage-comments/manage-comments.component';
import { Logo3DComponent } from './components/logo3-d/logo3-d.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com'

  },
  palette: {
    popup: {
      background: 'var(--sun)',
    },
    button: {
      background: 'var(--blue)',
    }
  },
  theme: 'edgeless',
  type: 'opt-out',

  // revokable: false,
  content: {

    message: "Un petit cookie pour la route?\n Avant de s'immerger dans l'Égypte des Pharaons ?",
    allow: 'Accepter',
    deny: 'Refuser',
    link: 'En savoir plus',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashPageComponent,
    // AnimationComponent,
    SearchComponent,
    ConnectionComponent,
    LoginComponent,
    RegisterComponent,
    ResultCardComponent,
    HeaderComponent,
    CreateQuizComponent,
    ScrollToTopComponent,
    UserProfileComponent,
    UserInfoComponent,
    QuizViewComponent,
    StarRatingComponent,
    QuizDetailsComponent,
    ArticleDetailsComponent,
    BadgesModalComponent,
    ArticlesCarouselComponent,
    ContactComponent,
    CommentsComponent,
    AdminComponent,
    ManageQuizComponent,
    ManageArticleComponent,
    ManageQuestionComponent,
    ManageBadgesComponent,
    ManageUsersComponent,
    ManageCommentsComponent,
    Logo3DComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      maxOpened: 1,
      autoDismiss: true,
      newestOnTop: true,
      enableHtml: true,
      easing: 'ease-in',

    }),
  ],
  providers: [
    DatePipe,
    CookieService,
    AuthGuard,
    AuthService,
    AdminGuardService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
