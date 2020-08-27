import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-modal-recuperar-senha',
  templateUrl: './modal-recuperar-senha.component.html',
  styleUrls: ['./modal-recuperar-senha.component.css']
})
export class ModalRecuperarSenhaComponent implements OnInit {
  public documentoRecuperar: string = '';

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  public async enviarEmail() {
    await this._usuarioService.recuperarSenha(this.documentoRecuperar);  
  }

}
