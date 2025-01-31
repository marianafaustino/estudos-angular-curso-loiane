import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  constructor(private http: HttpClient){

  }

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form)

    this.http.post("/oi/form", JSON.stringify(form.value)).subscribe({
      next: (data: any) => {
        console.log(data)
    }})
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

  consultaCEP(event: any, form: any) {
    let cep = event.target.value;
  
    if (typeof cep === 'string') {
      cep = cep.replace(/\D/g, ''); 
  
      if (cep !== "") {
        const validaCep = /^[0-9]{8}$/;
  
        if (validaCep.test(cep)) {
          this.resetaDadosForm(form)
          this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe({
            next: (data: any) => {
              this.populaDadosForm(data, form)
            },
            error: (err) => {
              console.error('Erro ao buscar o CEP:', err);
            }
          });
        }
      }
    } else {
      console.error('O valor do CEP não é uma string válida.');
    }
  }

  populaDadosForm(dados: any, formulario: any){
    formulario.form.patchValue({
      Endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }
    })
  }

  resetaDadosForm(formulario: any){
    formulario.form.patchValue({
      Endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
    }
    })
  }
  

  }
