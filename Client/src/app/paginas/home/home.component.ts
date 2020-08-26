import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public listaUsuarios: Array<UsuarioModel> = [
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true },
    { idUsuario: 5, documento: '123', nome: 'Lucas', email: 'lucas', senha: 'asdsa', admin: true, status: true }
  ];

  public paginaAtual = 1;
  public quantidadePorPagina = 5;
  public quantidadeTotalRegistros = 0;

  constructor(private _usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.verificaLogin();
    this.quantidadeTotalRegistros = await this._usuarioService.obterQuantidadeUsuarios();
    this.buscarUsuarios();
  }

  public atualizarGrid() {
    this.paginaAtual = 1;
    this.buscarUsuarios();
  }

  private verificaLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log(usuarioLogado);
    if (!usuarioLogado) {
      this.router.navigate(['']);
    }
  }

  public async buscarUsuarios() {
    this.listaUsuarios = await this._usuarioService.obterUsuarios(this.paginaAtual == 1 ? 0 : (this.paginaAtual - 1) * this.quantidadePorPagina, this.quantidadePorPagina);
    console.log(this.listaUsuarios);
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
    localStorage.removeItem('usuarioLogado');
    this.verificaLogin();
  }

}
