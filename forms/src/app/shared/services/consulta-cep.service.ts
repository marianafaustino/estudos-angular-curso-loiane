import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<any> {  
    if (typeof cep === 'string') {
      cep = cep.replace(/\D/g, ''); 

      if (cep !== "") {
        const validaCep = /^[0-9]{8}$/;

        if (validaCep.test(cep)) {
          return this.http.get(`https://viacep.com.br/ws/${cep}/json`); 
        }
      }
    }

    console.error('O valor do CEP não é válido.');
    return of({ erro: 'CEP inválido' }); 
  }
}
