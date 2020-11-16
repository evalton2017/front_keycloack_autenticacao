import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { EditaClienteComponent } from './edita-cliente/edita-cliente.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';


const routes: Routes = [
  {path:'clientes', component: LayoutComponent, children:[
    {path:'', component: ListaClientesComponent},
    {path:'form', component: FormClientesComponent},
    {path:'edit/:id', component: EditaClienteComponent},
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
