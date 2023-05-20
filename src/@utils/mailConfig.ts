import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
const mailConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: +process.env.MAIL_PORT === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  defaults: {
    from: '"Sandesh Tamang" <noreply@example.com>',
  },
  template: {
    dir: __dirname + '../../../templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

export default mailConfig;
