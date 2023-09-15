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
import { QuillModule } from 'ngx-quill';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
QuillModule.forRoot(),
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
export class AppModule {}
