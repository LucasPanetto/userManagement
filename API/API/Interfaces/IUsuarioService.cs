using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUsuarioService
    {
        public List<Usuario> ObterUsuarios(int inicio, int quantidade, bool admin, string documento, string filtro);
        public List<Usuario> ObterTodosUsuarios();
        public Usuario Login(string email, string senha);
        public Usuario ObterUsuarioPorDocumento(string documento);
        public Usuario ObterUsuarioPorId(int id);
        public int ObterQuantidadeUsuarios(bool admin, string documento, string filtro);
        public Task<Usuario> CriarUsuario(Usuario usuario);
        public Task<bool> AtualizarUsuario(Usuario usuario);
        public Task<bool> AtualizarUsuarioByEmail(Usuario usuario);
        public Task<bool> DeletarUsuario(int id);
    }
}
