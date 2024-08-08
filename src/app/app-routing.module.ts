import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './certificado/certificado.component';

const routes: Routes = [
  { path: '', redirectTo: '/certificado', pathMatch: 'full' },
  { path: 'certificado', component: CertificadoComponent },
  // Puedes añadir más rutas aquí si es necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
