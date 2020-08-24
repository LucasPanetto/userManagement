using API.Interfaces;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public Task<bool> AtualizarUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public Task<Usuario> CriarUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletarUsuario(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task<List<Usuario>> ObterTodosUsuarios()
        {
            throw new NotImplementedException();
        }

        public Task<Usuario> ObterUsuarioPorId(int id)
        {
            throw new NotImplementedException();
        }
    }
}
