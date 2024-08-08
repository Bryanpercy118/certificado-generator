import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { AppRoutingModule } from './app-routing.module';  // Importar AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    CertificadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule  // Importar AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
