import {z} from 'zod';
import { passwordRules } from './password-rules.schema';
export const RegisterSchema = z.object({
    email: z.email('Enter a valid email'),
    name: z.string().min(2, 'Name is too short').max(50),
    password: passwordRules,
});
export type RegisterDTO = z.infer<typeof RegisterSchema>;
