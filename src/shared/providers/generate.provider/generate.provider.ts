import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateAccNumber {
  accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export class GenerateCVV {}
