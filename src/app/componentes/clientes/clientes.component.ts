import { Component, OnInit } from '@angular/core';
import { ClienteServicio } from './../../servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  constructor(private clienteServicio: ClienteServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if(this.clientes) {
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if(!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
      // Agregar el nuevo cliente
    }
  }
}
