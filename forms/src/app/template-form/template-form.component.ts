import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form)
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(event: any){
    if(event.target){
      console.log(event.target.value)
    }else {
      console.log("Erro ao processar o cep.")
    }
  }
}
