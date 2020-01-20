import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserService } from './servises/user.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AuthService } from './servises/auth.service';
import { TaskService } from './servises/task.service';
import { AddTaskComponent } from './main/add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    AlertDialogComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  entryComponents:[AlertDialogComponent],
  providers: [
    UserService, 
    AuthService, 
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
