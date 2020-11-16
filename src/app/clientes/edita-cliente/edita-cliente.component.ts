import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../model/cliente';
import jQuery from 'jquery';

@Component({
  selector: 'app-edita-cliente',
  templateUrl: './edita-cliente.component.html',
  styleUrls: ['./edita-cliente.component.css']
})
export class EditaClienteComponent implements OnInit {
  clienteForm: FormGroup;
  cliente: Cliente;
  clientes: Cliente[];
  sucesso: boolean = false;
  errors: string[];

  constructor(
    private clienteService:ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let params = this.route.params;
    this.iniciaForm();
  }

  iniciaForm(){
    this.clienteForm = this.formBuilder.group({
      id: [null],
      dataCriacao: [null],
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]]
    });
    this.preencheForm();
  }

  preencheForm(){
    this.route.params.subscribe((id: Params) => {
      this.clienteService.buscaClientePorId(id.id).subscribe((res: Cliente) => {
        console.log(res);
        if (res) {
          this.clienteForm.patchValue({
            id: res.id,
            nome: res.nome,
            dataCriacao: res.dataCadastro,
            cpf: res.cpf,
          });
        }     
      }, error => {
        this.router.navigate(['/clientes']);
      });
    });
  }  

  atualizarCliente(){
    this.cliente = this.clienteForm.value;
    this.desabilitarBotao();
    this.clienteService.atualizarCliente(this.cliente.id, this.cliente).subscribe(success => {
      console.log('ok')
        this.router.navigate(['/clientes'])
        this.sucesso = true;
      }, error => {
        console.log(error);
        this.habilitarBotao();
        this.errors = ['Erro ao atualizar o cliente '+this.cliente.nome]
      });
  }

  habilitarBotao(){
    (function($) {
      "use strict";
      $("#atualizar").attr("disabled", false)
    })(jQuery);
  }

  desabilitarBotao(){
    (function($) {
      "use strict";
      $("#atualizar").attr("disabled", true)
    })(jQuery);
  }

}

