import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../Models/UsuarioModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public inputDocumento = '';
  public inputSenha = '';
  usuarioForm: any;
  public entidadeUsuario: UsuarioModel = new UsuarioModel();


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.preencherForm();
  }

  public preencherForm(): void {
    this.usuarioForm = this._formBuilder.group({
      IdUsuario: [this.entidadeUsuario.IdUsuario],
      Email: [this.entidadeUsuario.Email, [Validators.required, Validators.email]],
      Senha: [this.entidadeUsuario.Senha, [Validators.required]],
      Nome: [this.entidadeUsuario.Nome, [Validators.required]],
      Documento: [this.entidadeUsuario.Documento, [Validators.required]],
      Status: [this.entidadeUsuario.Status],
      Admin: [this.entidadeUsuario.Admin]
    });
  }

  public async submitFormulario(aluno: UsuarioModel): Promise<void> {
      // await this._alunoService.criarAluno(aluno);
    
    this.usuarioForm.reset();
  }

  public criarConta() {
    console.log('a');
  }

  public recuperarSenha() {
    console.log('a');
  }
}
