import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from "@angular/common/http";

// Imports para componentes do Angular Material
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ToastrModule } from "ngx-toastr";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from "./components/nav/nav.component";
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { authInterceptorProviders } from "./interceptor/auth.interceptor";
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, HeaderComponent, TecnicoListComponent, LoginComponent, TecnicoCreateComponent, TecnicoUpdateComponent, TecnicoDeleteComponent, DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      
    }),
    MatDialogModule,
    
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
