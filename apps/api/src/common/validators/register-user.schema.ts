import {z} from 'zod';
import { withPasswordConfirm } from './confirmpassword-rules.shema';
import { passwordRules } from './password-rules.schema';
export const RegisterSchema = withPasswordConfirm(z.object({
    email: z.string().email('Enter a valid email'),
    name: z.string().min(2, 'Name is too short').max(50),
    password: passwordRules,
})
);
export type RegisterDTO = z.infer<typeof RegisterSchema>;
