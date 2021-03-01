import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  sucesso: boolean = false;
  errors: string[];
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  constructor(
    private clienteService:ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private keycloack: KeycloakService,
  ) {
    this.clienteSelecionado = new Cliente();
  }

  ngOnInit(): void {
    this.inicializa();
    this.listarClientes();
  }

  inicializa(){

  }
  
  listarClientes(){
    this.clienteService.listarCliente().subscribe((res: any[]) => {
      this.clientes = res;
    }, error => {
      console.log(error);
    });
  }

  selecionarCliente(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  excluirCliente(codigo: number){
    this.clienteService.deletaCliente(codigo).subscribe((res: any)=>{
      this.sucesso = true;
      this.listarClientes();
       setTimeout (() => {
        this.sucesso = false;          
      }, 6000);
    },
     error => {
        this.errors = ['Erro ao excluir cliente']
    });
  }

}
