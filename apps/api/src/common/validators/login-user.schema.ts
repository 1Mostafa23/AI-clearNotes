import {email, z} from 'zod';
import { passwordRules } from './password-rules.schema';

export const LoginSchema = z.object({
    email: z.email('Enter a valid email'),
    password: passwordRules,
}) ;
export type LoginDTO = z.infer<typeof LoginSchema>;
