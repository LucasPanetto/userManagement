export class UsuarioModel {
    constructor(idUsuario?, email?, senha?, nome?, documento?, status?, admin?) {
        this.idUsuario = idUsuario;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.documento = documento;
        this.status = status;
        this.admin = admin;
    }

    idUsuario: number;
    email: string;
    senha: string;
    nome: string;
    documento: string;
    status: boolean;
    admin: boolean;
}