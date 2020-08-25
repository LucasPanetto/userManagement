export class UsuarioModel {
    constructor(IdUsuario?, Email?, Senha?, Nome?, Documento?, Status?, Admin?) {
        this.IdUsuario = IdUsuario;
        this.Email = Email;
        this.Senha = Senha;
        this.Nome = Nome;
        this.Documento = Documento;
        this.Status = Status;
        this.Admin = Admin;
    }

    IdUsuario: number;
    Email: string;
    Senha: string;
    Nome: string;
    Documento: string;
    Status: boolean;
    Admin: boolean;
}