import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from './../../servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor(private clienteServicio: ClienteServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    })
  }

  guardar({ value, valid }: { value: Cliente, valid: boolean }) {
    if( !valid ) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 400
      }); 
    } else {
      value.id = this.id;
      // Modificar cliente
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if(confirm('Seguro que desea eliminar el cliente?')) {
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
