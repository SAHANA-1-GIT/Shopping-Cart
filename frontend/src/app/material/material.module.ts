import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule} from '@angular/material/badge';



const MaterialsComponents = [
  MatBadgeModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MaterialsComponents
  ],
  exports: [
    MaterialsComponents
  ]
})
export class MaterialModule { }
