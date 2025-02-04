import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { map , switchMap, tap, of } from 'rxjs';
import { FormValidator } from '../shared/form-validator';
import { Cidade } from '../shared/models/cidade.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  formulario!: FormGroup 
  estados!: EstadoBr[]
  cidades!: Cidade[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ){
    this.dropdownService.getEstadosBr().subscribe((dados: EstadoBr[]) => {
      this.estados = dados;
      console.log("Estados carregados:", this.estados);
    });
    //this.estados = this.dropdownService.getEstadosBr()
    
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

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estadoSigla => console.log('Estado selecionado:', estadoSigla)),
        map(estadoSigla => this.estados?.find(e => e.sigla === estadoSigla)), 
        map(estado => estado ? estado.id : null), 
        switchMap(estadoId => estadoId ? this.dropdownService.getCidades(Number(estadoId)) : of([])) 
      )
      .subscribe((cidades: Cidade[]) => {
        console.log("Cidades carregadas:", cidades);
        this.cidades = cidades;
      });
  }

  get nome(): FormControl {
    return this.formulario.get('nome') as FormControl;
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
      //this.dropdownService.getCidades(8).subscribe(console.log)
      this.formulario.get('endereco.estado')?.valueChanges
    .pipe(
      tap(estado => console.log('Novo estado:', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : of(null)),
      switchMap(estadoId => estadoId ? this.dropdownService.getCidades(Number(estadoId)) : of([])))
      .subscribe((cidades: Cidade[]) => this.cidades = cidades)

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
