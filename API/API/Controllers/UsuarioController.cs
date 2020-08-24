using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(ILogger<UsuarioController> logger)
        { }

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
    }
}
