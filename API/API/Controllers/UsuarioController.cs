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
        public List<Usuario> ObterUsuarios()
        {
            try
            {
                List<Usuario> listaUsuarios = _usuarioService.ObterTodosUsuarios();
                return listaUsuarios;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("login/{documento}/{senha}")]
        public bool Login(string documento, string senha)
        {
            try
            {
                bool sucessoLogin = _usuarioService.Login(documento, senha);
                return sucessoLogin;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("recuperarSenha/{documento}")]
        public string RecuperaSenha(string documento)
        {
            try
            {
                Usuario usuario = _usuarioService.ObterUsuarioPorDocumento(documento);
                bool sucessoEnvio = false;

                if (usuario != null)
                {
                    sucessoEnvio = _emailService.EnviarEmail(usuario);
                }

                if (sucessoEnvio)
                {
                    return usuario.Email;
                }
                else
                {
                    return "";
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
        public async Task<bool> AtualizarAluno([FromBody] Usuario usuario)
        {
            bool usuarioAtualizado = await _usuarioService.AtualizarUsuario(usuario);
            return usuarioAtualizado;
        }
    }
}
