using API.Interfaces;
using API.Models;
using Newtonsoft.Json;
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

        public async Task<bool> AtualizarUsuarioByEmail(Usuario usuario)
        {
            try
            {
                Usuario usuarioBanco = ObterUsuarioPorId(usuario.IdUsuario);

                usuarioBanco.Senha = usuario.Senha;
                bool sucessoAtualizacao = _usuarioRepository.Update(usuarioBanco) != null;
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

        public Usuario Login(string documento, string senha)
        {
            List<Usuario> listaUsuarios = ObterTodosUsuarios();
            if (listaUsuarios.Where(x => x.Documento == documento && x.Senha == senha).Count() > 0)
            {
                return listaUsuarios.Where(x => x.Documento == documento && x.Senha == senha).FirstOrDefault();
            }
            else
            {
                return null;
            }
        }

        public List<Usuario> ObterTodosUsuarios()
        {
            List<Usuario> listaUsuarios = _usuarioRepository.GetAll().Result.OrderByDescending(x => x.IdUsuario).ToList();
            return listaUsuarios;
        }

        public List<Usuario> ObterUsuarios(int inicio, int quantidade, bool admin, string documento, string filtro)
        {
            List<Usuario> listaUsuarios;

            Usuario usuarioFiltro = JsonConvert.DeserializeObject<Usuario>(filtro);

            if (admin)
            {
                listaUsuarios = _usuarioRepository.GetAll().Result.OrderByDescending(x => x.IdUsuario).ToList();

                if (usuarioFiltro.Nome != String.Empty && usuarioFiltro.Nome != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Nome.Contains(usuarioFiltro.Nome)).ToList();
                }

                if (usuarioFiltro.Email != String.Empty && usuarioFiltro.Email != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Email.Contains(usuarioFiltro.Email)).ToList();
                }

                if (usuarioFiltro.Documento != String.Empty && usuarioFiltro.Documento != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Documento.Contains(usuarioFiltro.Documento)).ToList();
                }

                if (usuarioFiltro.Status == true)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Status == true).ToList();
                }

                if (usuarioFiltro.Admin == true)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Admin == true).ToList();
                }
            }
            else
            {
                listaUsuarios = _usuarioRepository.GetAll().Result.Where(x => x.Documento == documento).OrderByDescending(x => x.IdUsuario).Skip(inicio).Take(quantidade).ToList();
            }

            return listaUsuarios.Skip(inicio).Take(quantidade).ToList();
        }


        public int ObterQuantidadeUsuarios(bool admin, string documento, string filtro)
        {
            int quantidade;

            Usuario usuarioFiltro = JsonConvert.DeserializeObject<Usuario>(filtro);

            if (admin)
            {
                var listaUsuarios = _usuarioRepository.GetAll().Result;

                if (usuarioFiltro.Nome != String.Empty && usuarioFiltro.Nome != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Nome.Contains(usuarioFiltro.Nome)).ToList();
                }

                if (usuarioFiltro.Email != String.Empty && usuarioFiltro.Email != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Email.Contains(usuarioFiltro.Email)).ToList();
                }

                if (usuarioFiltro.Documento != String.Empty && usuarioFiltro.Documento != null)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Documento.Contains(usuarioFiltro.Documento)).ToList();
                }

                if (usuarioFiltro.Status == true)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Status == true).ToList();
                }

                if (usuarioFiltro.Admin == true)
                {
                    listaUsuarios = listaUsuarios.Where(x => x.Admin == true).ToList();
                }

                quantidade = listaUsuarios.Count();
            }
            else
            {
                quantidade = ObterTodosUsuarios().Where(x => x.Documento == documento).ToList().Count();
            }

            return quantidade;
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
    }
}
