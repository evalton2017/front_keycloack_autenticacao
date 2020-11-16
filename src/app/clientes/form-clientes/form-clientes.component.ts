import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
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
    this.clienteForm = this.formBuilder.group({
      id: [null],
      dataCriacao: [null],
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]]
    });
  }

  salvarCliente(){
    this.cliente = this.clienteForm.value;
    this.clienteService.cadastrarCliente(this.cliente).subscribe(success => {
        //this.preencheForm(success);
        this.router.navigate(['/clientes'])
        this.sucesso = true;
      }, error => {
        this.errors = error.error.errors;
      });
  }

  preencheForm(cliente: Cliente){
    this.clienteForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      dataCriacao: cliente.dataCadastro,
      cpf: cliente.cpf,
    });
  }

}
