import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { LoginAuthGuardService } from './services/login-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';

import { AnimationComponent } from './components/animation/animation.component';
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

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
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
  type: 'opt-out'
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    SplashPageComponent,
    AnimationComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    AuthGuard,
    LoginAuthGuardService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
