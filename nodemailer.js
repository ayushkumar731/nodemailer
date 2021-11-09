const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

class Nodemailer {
  constructor(data, to, subject) {
    this.data = data;
    this.to = to;
    this.SMTP_USER = 'your gmail id';
    this.SMTP_PASSWORD = 'your gmail password';
    this.subject = subject;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      server: 'smtp.gmail.com',
      port: '465',
      auth: {
        user: this.SMTP_USER,
        pass: this.SMTP_PASSWORD,
      },
    });
  }

  async send(template) {
    const Template = path.join(__dirname, './emailTemplates', `${template}`);
    const emailTemplate = new Email({ views: { root: Template } });
    const locals = {
      data: this.data,
    };

    const html = await emailTemplate.render(template, locals);
    
    const mailOptions = {
      from: this.SMTP_USER,
      to: this.to,
      subject: this.subject,
      html,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendMail() {
    await this.send('welcome');
  }
}

module.exports = Nodemailer;
