import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { WhyComponent } from './why/why.component';
import { CreditComponent } from './credit/credit.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomeeComponent } from './homee/homee.component';
import { ProjectRequestShowComponent } from './project-request-show/project-request-show.component';
import { ContratComponent } from './contrat/contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
import { ProjectShowComponent } from './project-show/project-show.component';
import { ContratShowComponent } from './contrat-show/contrat-show.component';
import { ProjectRequestEditComponent } from './project-request-edit/project-request-edit.component';
import { ProjectRequestComponent } from './project-request/project-request.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectComponent } from './project/project.component';
const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    {path: 'homee', component: HomeeComponent},
    {path: 'about', component:AboutComponent},
    {path:'service',component:ServiceComponent},
    {path:'team',component:TeamComponent},
    {path:'why',component:WhyComponent},
    {path:'credit',component:CreditComponent},
    {path:'creditR',component:CreditRequestComponent},
    {path:'recovery',component:RecoveryComponent},
    {path:'projectRequest',component:ProjectRequestShowComponent},
    {path:'ajoutcontrat',component:ContratComponent},
    {path:'Editcontrat/:id',component:EditContratComponent},
    {path:'EditprojectRequest/:id',component:ProjectRequestEditComponent},
    {path:'project',component:ProjectShowComponent},
    {path:'contrat',component:ContratShowComponent},
    {path:'projectRequestAdd',component:ProjectRequestComponent},
    {path:'Editproject/:id',component:ProjectEditComponent},
    {path:'ajoutprojet',component:ProjectComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
