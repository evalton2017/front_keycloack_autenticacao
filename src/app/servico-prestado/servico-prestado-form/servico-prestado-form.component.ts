import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { Cliente } from 'src/app/clientes/model/cliente';
import { ServicoPrestado } from '../model/servicos-prestados';
import { ServicoPrestadoService } from '../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit, AfterViewInit {
  sucesso: boolean = false;
  errors: string[];
  servicos: ServicoPrestado[]=[];
  clientes: Cliente[];
  servicoPrestado: ServicoPrestado;
  servicoPrestadoForm: FormGroup;
  
  constructor(
    private servicoPrestadoService:ServicoPrestadoService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { 
      
  }

  ngOnInit(): void {
    this.servicoPrestadoForm = this.formBuilder.group({
      id: [null],
      descricao: [null],
      idCliente: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      data: [null, [Validators.required]]
    });
  }

  ngAfterViewInit(){
    this.listarClientes();
  }

  salvarServico(){
    this.servicoPrestado = this.servicoPrestadoForm.value;
    this.servicoPrestadoService.cadastrarServico(this.servicoPrestado).subscribe(success => {
        this.router.navigate(['/servicos-prestados'])
        this.sucesso = true;
      }, error => {
        this.errors = error.error.errors;
      });
  }

  preencheForm(servico: ServicoPrestado){
    this.servicoPrestadoForm.patchValue({
      id: servico.id,
      descricao: servico.descricao,
      idCliente: servico.idCliente,
      preco: servico.preco,
      data: servico.data,
    });
  }

  listarClientes(){
    this.clienteService.listarCliente().subscribe((res: any[]) => {
      console.log(res);
      this.clientes = res;
    }, error => {
      
    });
  }


}
