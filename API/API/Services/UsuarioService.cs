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

        public UsuarioService(IUsuarioRepository usuarioRepo)
        {
            _usuarioRepository = usuarioRepo;
        }
        public async Task<bool> AtualizarUsuario(Usuario usuario)
        {
            try
            {
                bool sucessoAtualizacao = _usuarioRepository.Update(usuario) != null;
                await _usuarioRepository.SaveChangesAsync();
                return sucessoAtualizacao;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Usuario> CriarUsuario(Usuario usuario)
        {
            try
            {
                Usuario usuarioCriado = _usuarioRepository.Create(usuario);
                await _usuarioRepository.SaveChangesAsync();
                return usuarioCriado;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeletarUsuario(int id)
        {
            try
            {
                await _usuarioRepository.Delete(id);
                return await _usuarioRepository.SaveChangesAsync() > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Login(string documento, string senha)
        {
            List<Usuario> listaUsuarios = ObterTodosUsuarios();
            if (listaUsuarios.Where(x => x.Documento == documento && x.Senha == senha).Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Usuario> ObterTodosUsuarios()
        {
            List<Usuario> listaUsuarios = _usuarioRepository.GetAll().Result;
            return listaUsuarios;
        }

        public Usuario ObterUsuarioPorDocumento(string documento)
        {
            Usuario listaUsuarios = ObterTodosUsuarios().Where(x => x.Documento == documento).FirstOrDefault();
            return listaUsuarios;
        }

        public Usuario ObterUsuarioPorId(int id)
        {
            Usuario usuario = _usuarioRepository.GetById(id).Result;
            return usuario;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _usuarioRepository?.Dispose();
            }
        }
    }
}
