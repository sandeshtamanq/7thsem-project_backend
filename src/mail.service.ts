import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async welcomeMail(user: string, to: string) {
    this.mailerService.sendMail({
      to,
      subject: 'Welcome to out website',
      template: 'welcome',
      context: {
        user,
      },
    });
  }
}
