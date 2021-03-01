import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { EditaClienteComponent } from './edita-cliente/edita-cliente.component';
import { PublicComponent } from './public/public.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [FormClientesComponent, ListaClientesComponent, EditaClienteComponent, PublicComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class ClientesModule { }
