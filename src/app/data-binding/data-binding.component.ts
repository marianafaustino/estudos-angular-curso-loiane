import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {

  url = 'http://loiane.com'
  urlImagem = 'http://lorempixel.com.br/400/200/nature/'
  cursoAngular = true
  nome: string = 'abc'

  getCurtirCurso(){
    return true
  }

  getValor(){
    return 1
  }

  botaoClicado(){
    alert("OI")
  }
}
