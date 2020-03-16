import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';
import { ModalPage } from './modal.page';
import { PopoverComponent } from '../components/popover/popover.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalPageRoutingModule,
  ],
  entryComponents: [PopoverComponent],
  declarations: [ModalPage, PopoverComponent]
})
export class ModalPageModule {}
