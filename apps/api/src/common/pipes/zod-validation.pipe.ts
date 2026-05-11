import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parseValue = this.schema.parse(value);
      return parseValue;
    } catch (error) {
      if (error instanceof ZodError)
        throw new BadRequestException(error.flatten().fieldErrors);
    }
    throw new BadRequestException('validation failed');
  }
}
//!ПОВТОРИТЬ!!!!
