import { Cliente } from 'src/app/clientes/model/cliente';

export class ServicoPrestado{
    id?: number;
    descricao?: string;
    cliente?:Cliente;
    idCliente?: number;
    preco?: string;
    data?: string;
    valor?:string;
}