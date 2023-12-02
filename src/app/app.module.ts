import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { EditorComponent } from './Pages/editor/editor.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ViewerComponent } from './Pages/viewer/viewer.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { MyModalComponent } from './Components/my-modal/my-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditorComponent,
    NavbarComponent,
    ViewerComponent,
    UserProfileComponent,
    MyModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
