import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.model';
import { Observable } from 'rxjs/internal/Observable';
import { Cidade } from '../models/cidade.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json'); // Tipagem correta
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[])=> cidades.filter(c => Number(c.estado) === idEstado)) 
    )
  }
}
