import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from '../models/entity/contact.entity';
import { Repository } from 'typeorm';
import { ContactDto } from '../models/dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  postMessage(contactDto: ContactDto) {
    const newMessage = this.contactRepository.create({
      name: contactDto.fullName,
      email: contactDto.email,
      message: contactDto.message,
    });
    return this.contactRepository.save(newMessage);
  }
}
