import z, { ZodObject, ZodRawShape } from "zod";
import { passwordRules } from "./password-rules.schema";

export const confirmationRules = z.object({
    password: passwordRules,
})
export const withPasswordConfirm = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>{
    return schema
    .extend({
        
        confirmPassword: z.string().min(1,'Confirm your password')
    })
    .refine((data) =>{  //насчет any, можно сделать так, чтобы тип был не any, но я не знаю как, так что пока так
        const obj = data as Record<'password' | 'confirmPassword', string>;
        return obj.password === obj.confirmPassword},{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
}