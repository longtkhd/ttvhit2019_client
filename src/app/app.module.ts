import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { APIModule } from './services/service.module';
import { HttpModule } from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MainModule} from './main/main.module'
import { AdminModule } from './admin/admin.module';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JudgeComponent } from './judge/judge.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    JudgeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatterialModule,
    CommonModule,
    APIModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    MainModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
