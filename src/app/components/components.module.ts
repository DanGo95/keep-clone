import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotasComponent } from './notas/notas.component';
import { ModalComponent } from './modal/modal.component';

import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    NotasComponent,
    ModalComponent
  ],
  exports: [
    NotasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
