import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';
import { ModalPage } from './modal.page';
import { PopoverComponent } from '../components/popover/popover.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
  ],
  entryComponents: [PopoverComponent],
  declarations: [ModalPage, PopoverComponent]
})
export class ModalPageModule {}
