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

    async obterUsuarios(inicio: number, quantidade: number): Promise<UsuarioModel[]> {
        const retorno = await this._http.get<UsuarioModel[]>(`${this.urlPathApi}${inicio}/${quantidade}`).toPromise().then();
        return retorno;
    }

    async obterQuantidadeUsuarios(): Promise<number> {
        const retorno = await this._http.get<number>(`${this.urlPathApi}quantidade`).toPromise().then();
        return retorno;
    }

    async obterAlunoPorId(alunoid: number): Promise<UsuarioModel> {
        const apiurl = `${this.urlPathApi}/${alunoid}`;
        return await this._http.get<UsuarioModel>(apiurl).toPromise().then();
    }



    async atualizarAluno(aluno: UsuarioModel): Promise<void> {
        try {
            const apiurl = `${this.urlPathApi}`;
            await this._http.put<UsuarioModel>(apiurl, aluno, httpOptions).toPromise().then();
            this._toastr.success('Aluno atualizado.', 'Sucesso!');
        } catch (error) {
            this._toastr.error('Houve um erro ao atualizar.', 'Erro!');
        }
    }

    async deletarAlunoPorId(alunoid: number): Promise<void> {
        try {
            const apiurl = `${this.urlPathApi}/${alunoid}`;
            await this._http.delete<number>(apiurl, httpOptions).toPromise().then();
            this._toastr.success('Aluno excluído.', 'Sucesso!');
        } catch (error) {
            this._toastr.error('Houve um erro ao excluir.', 'Erro!');
        }
    }
}