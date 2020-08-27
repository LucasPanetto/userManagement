using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IEmailService _emailService;

        public UsuarioController(IUsuarioService usuarioService, IEmailService emailService)
        {
            _emailService = emailService;
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [Route("{inicio}/{quantidade}/{admin}/{documento}/{filtro}")]

        public List<Usuario> ObterUsuarios(int inicio, int quantidade, bool admin, string documento, string filtro)
        {
            try
            {
                List<Usuario> listaUsuarios = _usuarioService.ObterUsuarios(inicio, quantidade, admin, documento, filtro);
                return listaUsuarios;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("{idUsuario}")]
        public Usuario ObterUsuario(int idUsuario)
        {
            try
            {
                Usuario usuario = _usuarioService.ObterUsuarioPorId(idUsuario);
                return usuario;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [HttpGet]
        [Route("quantidade/{admin}/{documento}/{filtro}")]
        public int ObterQuantidadeUsuarios(bool admin, string documento, string filtro)
        {
            try
            {
                int quantidade = _usuarioService.ObterQuantidadeUsuarios(admin, documento, filtro);
                return quantidade;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("login/{documento}/{senha}")]
        public Usuario Login(string documento, string senha)
        {
            try
            {
                Usuario usuarioLogado = _usuarioService.Login(documento, senha);
                return usuarioLogado;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("recuperarSenha/{documento}")]
        public bool RecuperaSenha(string documento)
        {
            try
            {
                Usuario usuario = _usuarioService.ObterUsuarioPorDocumento(documento);
                bool sucessoEnvio = false;

                if (usuario != null)
                {
                     sucessoEnvio =  _emailService.EnviarEmail(usuario);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<Usuario> CriarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                Usuario usuarioCadastrado = await _usuarioService.CriarUsuario(usuario);
                return usuarioCadastrado;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeletarUsuario(int id)
        {
            try
            {
                bool alunoExcluido = await _usuarioService.DeletarUsuario(id);
                if (alunoExcluido)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public async Task<bool> AtualizarUsuario([FromBody] Usuario usuario)
        {
            bool usuarioAtualizado = await _usuarioService.AtualizarUsuario(usuario);
            return usuarioAtualizado;
        }
    }
}
