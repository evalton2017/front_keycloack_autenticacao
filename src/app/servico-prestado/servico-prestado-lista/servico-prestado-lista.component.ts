import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicoPrestado } from '../model/servicos-prestados';
import { ServicoPrestadoService } from '../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {
  
  sucesso: boolean = false;
  errors: string[];
  servicos: ServicoPrestado[]=[];
  servicoPrestado: ServicoPrestado;

  nome: string;
  mes: number;
  meses:number[];

  constructor(
    private servicoPrestadoService:ServicoPrestadoService,
    ) { 
    this.servicoPrestado = new ServicoPrestado();
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]
    this.nome = "";
  }

  ngOnInit(): void {
    this.consultarServico();
  }

  inicializa(){

  }

  consultarServico(){
    this.servicoPrestadoService.listaServicos(this.nome, this.mes).subscribe((res: any[]) => {
      console.log(res);
      this.servicos = res;
    }, error => {
      console.log("erro");
    });     
  }


}
