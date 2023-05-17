import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { ContactDto } from '../models/dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  postMessage(@Body() contactDto: ContactDto) {
    return this.contactService.postMessage(contactDto);
  }
}
