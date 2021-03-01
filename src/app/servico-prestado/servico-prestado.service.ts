import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../clientes/model/cliente';
import { ServicoPrestado } from './model/servicos-prestados';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  API = environment.API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  listaServicos(nome:string, mes?:number): Observable<ServicoPrestado[]> {
    let params = new HttpParams();
    if(nome!=""){
      params = params.append('nome', nome);
    }

    if(mes){
      params = params.append('mes', mes.toString());
    }
    console.log(this.API + `servicos-prestados?${params.toString()}`);
    return this.http.get<any>(this.API+`servicos-prestados?$`+params.toString());
  }

  cadastrarServico(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<any>(this.API + `servicos-prestados`, servicoPrestado, this.httpOptions);
  }

  listarCliente(): Observable<Cliente[]> {
    return this.http.get<any>(this.API + `clientes`);
  }

}
