import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json'); // Tipagem correta
  }
}
