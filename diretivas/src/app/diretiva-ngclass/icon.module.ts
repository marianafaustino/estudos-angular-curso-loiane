// icon.module.ts
import { NgModule } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Star, StarFill } from 'ng-bootstrap-icons/icons';

const icons = { Star, StarFill };

@NgModule({
  imports: [BootstrapIconsModule.pick(icons)],
  exports: [BootstrapIconsModule]
})
export class IconsModule { }
