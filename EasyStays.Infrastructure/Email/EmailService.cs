using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Email;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EasyStays.Infrastructure.Email
{
    public class EmailService : IEmailService
    {
        private readonly MailSettings _mailSettings;

        public EmailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var client = new SendGridClient(_mailSettings.SendGridApiKey);
            var from = new EmailAddress(_mailSettings.SenderEmail, _mailSettings.SenderName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, body);
            var response = await client.SendEmailAsync(msg);

        }
        public async Task SendEmailWithAttachmentAsync(string toEmail, string subject, string body, byte[] attachmentBytes, string attachmentName)
        {
            var client = new SendGridClient(_mailSettings.SendGridApiKey);
            var from = new EmailAddress(_mailSettings.SenderEmail, _mailSettings.SenderName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, body);

            var base64Content = Convert.ToBase64String(attachmentBytes);
            msg.AddAttachment(attachmentName, base64Content);

            var response = await client.SendEmailAsync(msg);

            var responseBody = await response.Body.ReadAsStringAsync();
            Console.WriteLine($"SendGrid Response: {response.StatusCode} {responseBody}");
        }

    }
}
