import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidator } from '../form-validator';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {
  //@Input() mostrarErro: boolean = false
  //@Input() msgErro: string = ""
  @Input() control!: AbstractControl | FormControl;
  @Input() label: string = ""

  get errorMessage(){
    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched){
          return FormValidator.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
        }
    }
    return null
  }
}
