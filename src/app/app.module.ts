import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CreditComponent } from './credit/credit.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomeeComponent } from './homee/homee.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';
import { ServiceComponent } from './service/service.component';
import { WhyComponent } from './why/why.component';
import { TeamComponent } from './team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectRequestEditComponent } from './project-request-edit/project-request-edit.component';
import { ProjectRequestShowComponent } from './project-request-show/project-request-show.component';
import { ProjectRequestComponent } from './project-request/project-request.component';
import { ContratComponent } from './contrat/contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
import { ProjectShowComponent } from './project-show/project-show.component';
import { ContratShowComponent } from './contrat-show/contrat-show.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    CreditComponent,
    CreditRequestComponent,
    RecoveryComponent,
    HomeeComponent,
    HeaderComponent,
    InfoComponent,
    ServiceComponent,
    WhyComponent,
    TeamComponent,
 ProjectRequestEditComponent ,
 ProjectRequestShowComponent,
 ProjectEditComponent,
 ProjectRequestComponent,
 ContratComponent,
 EditContratComponent,
 ProjectShowComponent,
 ContratShowComponent,
 ProjectComponent
  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

