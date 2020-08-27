import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../Models/UsuarioModel';
import { ToastrService } from 'ngx-toastr';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    urlPathApi = 'https://localhost:44352/usuario/';

    constructor(private _http: HttpClient, private _toastr: ToastrService) { }

    async criarUsuario(usuario: UsuarioModel): Promise<void> {
        try {
            await this._http.post<UsuarioModel>(this.urlPathApi, usuario, httpOptions).toPromise().then();
            this._toastr.success('Usuário cadastrado.', 'Sucesso!');
        } catch (error) {
            console.log(error);
            this._toastr.error('Houve um erro ao cadastrar.', 'Erro!');
        }
    }

    async login(login: any): Promise<UsuarioModel> {
        try {
            const usuarioLogado = await this._http.get<UsuarioModel>(`${this.urlPathApi}login/${login.documento}/${login.senha}`).toPromise().then();
            if (!usuarioLogado) {
                this._toastr.error('Usuário ou senha incorretos.', 'Erro!');
            }
            return usuarioLogado;
        } catch (error) {
            console.log(error);
            this._toastr.error('Houve um erro ao fazer login.', 'Erro!');
        }
    }

    async recuperarSenha(documento: string): Promise<void> {
        try {
            const emailEnviado = await this._http.get<boolean>(`${this.urlPathApi}recuperarSenha/${documento}`).toPromise().then();
            if (!emailEnviado) {
                this._toastr.error('Documento Não Encontrado.', 'Erro!');
            } else {
                this._toastr.success(`Nova senha enviada para seu e-mail cadastrado.`, 'Sucesso!');
            }
        } catch (error) {
            console.log(error);
            this._toastr.error('Houve um erro ao enviar nova senha.', 'Erro!');
        }
    }

    async obterUsuarios(inicio: number, quantidade: number, admin: boolean, documento: string, filtro: string): Promise<UsuarioModel[]> {
        const retorno = await this._http.get<UsuarioModel[]>(`${this.urlPathApi}${inicio}/${quantidade}/${admin}/${documento}/${filtro}`).toPromise().then();
        return retorno;
    }

    async obterUsuarioPorId(idUsuario: number): Promise<UsuarioModel> {
        const apiurl = `${this.urlPathApi}${idUsuario}`;
        return await this._http.get<UsuarioModel>(apiurl).toPromise().then();
    }


    async obterQuantidadeUsuarios(admin: boolean, documento: string, filtro: string): Promise<number> {
        const retorno = await this._http.get<number>(`${this.urlPathApi}quantidade/${admin}/${documento}/${filtro}`).toPromise().then();
        return retorno;
    }

    async atualizarUsuario(usuario: UsuarioModel): Promise<void> {
        try {
            const apiurl = `${this.urlPathApi}`;
            await this._http.put<UsuarioModel>(apiurl, usuario, httpOptions).toPromise().then();
            this._toastr.success('Usuario atualizado.', 'Sucesso!');
        } catch (error) {
            this._toastr.error('Houve um erro ao atualizar.', 'Erro!');
        }
    }

    async deletarUsuario(usuarioid: number): Promise<void> {
        try {
            const apiurl = `${this.urlPathApi}${usuarioid}`;
            await this._http.delete<number>(apiurl, httpOptions).toPromise().then();
            this._toastr.success('Usuario excluído.', 'Sucesso!');
        } catch (error) {
            this._toastr.error('Houve um erro ao excluir.', 'Erro!');
        }
    }
}