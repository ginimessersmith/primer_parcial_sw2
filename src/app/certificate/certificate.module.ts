import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCertificateComponent } from './components/update-certificate/update-certificate.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    UpdateCertificateComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CertificateModule { }
