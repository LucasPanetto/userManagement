using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUsuarioService : IDisposable
    {
        public Task<List<Usuario>> ObterTodosUsuarios();

        public Task<Usuario> ObterUsuarioPorId(int id);

        public Task<Usuario> CriarUsuario(Usuario usuario);

        public Task<bool> AtualizarUsuario(Usuario usuario);

        public Task<bool> DeletarUsuario(int id);
    }
}
