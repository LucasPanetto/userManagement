import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../Models/UsuarioModel';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public inputdocumento = '';
  public inputsenha = '';
  loginForm: any;
  public exibirModalCadastro = false as boolean;


  constructor(private _formBuilder: FormBuilder, private _usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.verificaLogin();
    this.preencherForm();
  }

  private verificaLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
      this.router.navigate(['/home']);
    }
  }

  public preencherForm(): void {
    this.loginForm = this._formBuilder.group({
      documento: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  public async submitFormularioLogin(login: any): Promise<void> {
    const usuarioLogado = await this._usuarioService.login(login);
    if (usuarioLogado) {
      localStorage.removeItem('usuarioLogado');
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      this.router.navigate(['/home']);
    }
  }

  public recuperarsenha() {
    console.log('a');
  }
}
