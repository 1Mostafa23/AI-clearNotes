import { BadRequestException } from "@nestjs/common";
export function validatePassword(password: string) {
  const errors: string[] = [];

  if (!password) errors.push('Password is required');
  if (password.length < 7) errors.push('Password too short');
  if (!/[A-Z]/.test(password)) errors.push('Missing uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Missing lowercase letter');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Missing special character');

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
  
  } 

  //~ я написал этот способ специально, чтобы показать насколько зод хорош и лучше обычных ифов