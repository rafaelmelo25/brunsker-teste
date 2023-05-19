import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel, Endereco } from '../models/imovel.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5875/api/imovel';

  constructor(private http: HttpClient) {}

  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.apiUrl);
  }

  getImovel(id: number): Observable<Imovel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Imovel>(url);
  }

  createImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.apiUrl, imovel);
  }

  updateImovel(id: number, imovel: Imovel): Observable<Imovel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Imovel>(url, imovel);
  }

  deleteImovel(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  consultarCEP(cep: string): Observable<Endereco> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
