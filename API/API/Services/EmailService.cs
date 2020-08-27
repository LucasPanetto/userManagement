using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using API.Interfaces;
using API.Models;
using System.Security.Cryptography;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IUsuarioService _usuarioService;
        public EmailService(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        public bool EnviarEmail(Usuario usuario)
        {
            try
            {
                MailMessage msg = new MailMessage();

                var bytes = new byte[8];
                using (var rng = new RNGCryptoServiceProvider())
                {
                    rng.GetBytes(bytes);
                }
                string novaSenha = BitConverter.ToString(bytes);

                msg.From = new MailAddress("lucaspanetto1998@gmail.com");
                msg.To.Add(usuario.Email);
                msg.Subject = "Gerenciamento de Usuários - Nova Senha";
                msg.IsBodyHtml = true;
                msg.Body = String.Format("<h3>Olá, {0}.</h3> </br> Sua nova senha de acesso no sistema <b>Gerenciamento de Usuários</b> é: <b>{1}</b>", usuario.Nome, novaSenha);

                using (SmtpClient client = new SmtpClient())
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("lucaspanetto1998@gmail.com", "Lucas@2012");
                    client.Host = "smtp.gmail.com";
                    client.Port = 587;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;

                    client.Send(msg);
                }

                usuario.Senha = novaSenha;
                _usuarioService.AtualizarUsuarioByEmail(usuario);

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
