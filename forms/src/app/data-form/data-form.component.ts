import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';
import { FormValidator } from '../shared/form-validator';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  formulario!: FormGroup 
  estados!: Observable<EstadoBr[]>

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ){
    /*this.dropdownService.getEstadosBr().subscribe((dados: EstadoBr[]) => {
      this.estados = dados;
      console.log("Estados carregados:", this.estados);
    });*/
    this.estados = this.dropdownService.getEstadosBr()

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [FormValidator.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      termos: [null]
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
      if(this.formulario.valid){
        this.http.post("/oi/form", JSON.stringify(this.formulario.value)).subscribe({
          next: (data: any) => {
            console.log(data)
            //reseta o form
            this.formulario.reset()
        }})
      } else{
        console.log('Formulário inválido')
        this.verificaValidacoesForm(this.formulario)
      }

      console.log(this.formulario)
    }

    verificaValidacoesForm(formGroup: FormGroup){
      Object.keys(formGroup.controls).forEach(campo => {
        console.log(campo)
        const controle = formGroup.get(campo)
        controle?.markAsDirty()

        if(controle instanceof FormGroup){
          this.verificaValidacoesForm(controle)
        }
      })
    }

    resetar(){
      this.formulario.reset()
    }

    consultaCEP() {
      let cep = this.formulario.get('endereco.cep')?.value
      console.log(cep)

      if (cep != null && cep != '') {
        this.cepService.consultaCEP(cep)
        .subscribe({
          next: (data: any) => {
            this.populaDadosForm(data)
          },
          error: (err) => {
            console.error('Erro ao buscar o CEP:', err);
          }
        });
      } 
    }

    populaDadosForm(dados: any){
      this.formulario.patchValue({
        endereco: {
          cep: dados.cep,
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
      }
      })
    }

    resetaDadosForm(){
      this.formulario.patchValue({
        endereco: {
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
