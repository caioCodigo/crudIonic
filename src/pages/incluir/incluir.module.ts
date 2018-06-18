import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncluirPage } from './incluir';

@NgModule({
  declarations: [
    IncluirPage,
  ],
  imports: [
    IonicPageModule.forChild(IncluirPage),
  ],
})
export class IncluirPageModule {}
