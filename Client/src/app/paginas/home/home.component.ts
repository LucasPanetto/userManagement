import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public listaUsuarios: Array<UsuarioModel> = [];
  public usuarioEdicao: UsuarioModel;
  public paginaAtual = 1;
  public quantidadePorPagina = 5;
  public quantidadeTotalRegistros = 0;
  public usuarioLogado: UsuarioModel = new UsuarioModel();
  public entidadeBusca: UsuarioModel = new UsuarioModel();

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.verificaLogin();
    await this.calculaTotalRegistros();
    this.buscarUsuarios();
  }

  public async calculaTotalRegistros() {
    const filtro = JSON.stringify(this.entidadeBusca);
    this.quantidadeTotalRegistros = await this._usuarioService.obterQuantidadeUsuarios(this.usuarioLogado.admin, this.usuarioLogado.documento, filtro);
  }

  public eventReceiveAtualizaLista() {
    this.atualizarGrid();
  }

  public btnLimparConsulta() {
    this.entidadeBusca = new UsuarioModel();
    this.atualizarGrid();
  }

  public atualizarGrid() {
    this.paginaAtual = 1;
    this.calculaTotalRegistros();
    this.buscarUsuarios();
  }

  private async verificaLogin() {
    try {
      if (localStorage.getItem('idUsuarioLogado')) {
        this.usuarioLogado = await this._usuarioService.obterUsuarioPorId(Number.parseInt(localStorage.getItem('idUsuarioLogado')));
      } else {
        this.usuarioLogado = null;
      }
    } catch{

    } finally {
      if (!this.usuarioLogado) {
        this.router.navigate(['']);
      }
    }
  }

  public async buscarUsuarios() {
    const filtro = JSON.stringify(this.entidadeBusca);
    this.listaUsuarios = await this._usuarioService.obterUsuarios(this.paginaAtual == 1 ? 0 : (this.paginaAtual - 1) * this.quantidadePorPagina, this.quantidadePorPagina, this.usuarioLogado.admin, this.usuarioLogado.documento, filtro);
  }

  public paginaAnterior() {
    this.paginaAtual--;
    this.buscarUsuarios();
  }

  public paginaSeguinte() {
    this.paginaAtual++;
    this.buscarUsuarios();
  }

  public logout() {
    localStorage.removeItem('idUsuarioLogado');
    this.verificaLogin();
  }

  public atualizaUsuarioEdicao(usuario: UsuarioModel) {
    this.usuarioEdicao = usuario;
  }

  public async removerUsuario(idUsuario: number) {
    await this._usuarioService.deletarUsuario(idUsuario);
    this.calculaTotalRegistros();
    this.buscarUsuarios();
  }

}
