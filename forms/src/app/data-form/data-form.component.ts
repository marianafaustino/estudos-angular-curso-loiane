import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  formulario!: FormGroup 

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ){
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
  /*ngOnInit(){
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    })
  }*/

    onSubmit(){
      console.log(this.formulario)

      this.http.post("/oi/form", JSON.stringify(this.formulario.value)).subscribe({
        next: (data: any) => {
          console.log(data)
          //reseta o form
          this.formulario.reset()
      }})
    }

    resetar(){
      this.formulario.reset()
    }
}
