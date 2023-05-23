import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages'; 
import { ConfirmationService } from 'primeng/api';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    FormsModule,
    ToolbarModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    MessagesModule,
   
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
