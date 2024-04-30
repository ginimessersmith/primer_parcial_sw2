import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListInscriptionComponent } from './components/list-inscription/list-inscription.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListInscriptionComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class InscriptionModule { }
