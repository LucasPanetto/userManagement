import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-gerenciar-usuario',
  templateUrl: './modal-gerenciar-usuario.component.html',
  styleUrls: ['./modal-gerenciar-usuario.component.css']
})
export class ModalGerenciarUsuarioComponent implements OnInit {
  usuarioForm: any;
  public entidadeUsuario: UsuarioModel = new UsuarioModel();
  @Input() usuarioEdicao: UsuarioModel = new UsuarioModel();
  @Output() emitirAtualizarLista = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (this.usuarioEdicao) {
      this.entidadeUsuario = this.usuarioEdicao;
    }
    this.preencherForm();
  }

  ngOnChanges(): void {
    if (this.usuarioEdicao && this.usuarioEdicao.idUsuario > 0) {
      this.entidadeUsuario = this.usuarioEdicao;
    }else{
      this.entidadeUsuario = new UsuarioModel();
    }
    this.preencherForm();
  }

  public preencherForm(): void {
    this.usuarioForm = this._formBuilder.group({
      idUsuario: [this.entidadeUsuario.idUsuario ||0],
      email: [this.entidadeUsuario.email, [Validators.required, Validators.email]],
      senha: [this.entidadeUsuario.senha, [Validators.required]],
      nome: [this.entidadeUsuario.nome, [Validators.required]],
      documento: [this.entidadeUsuario.documento, [Validators.required]],
      status: [this.entidadeUsuario.status],
      admin: [this.entidadeUsuario.admin]
    });
  }

  public async submitFormularioCadastro(usuario: UsuarioModel): Promise<void> {
    if (usuario.admin == null) {
      usuario.admin = false;
    }
    if (usuario.status == null) {
      usuario.status = false;
    }
    debugger;
    if (this.usuarioEdicao && this.usuarioEdicao.idUsuario > 0) {
      await this._usuarioService.atualizarUsuario(usuario);
      this.emitirAtualizarLista.emit(true);
    }else{
      await this._usuarioService.criarUsuario(usuario);
      this.emitirAtualizarLista.emit(true);
    }
    const botaoCancelar: HTMLElement = document.getElementById('btnCancelar') as HTMLElement;
    botaoCancelar.click();
  }
}
