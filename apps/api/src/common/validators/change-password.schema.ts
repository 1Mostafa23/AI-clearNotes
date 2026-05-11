import { z } from "zod";
import { passwordRules } from "./password-rules.schema";
import { withPasswordConfirm } from "./confirmpassword-rules.shema";
export const ChangePasswordSchema = withPasswordConfirm(z.object({
    oldPassword: z.string().min(1, 'Enter ur old password'),
    password: passwordRules
}))
export type ChangePasswordDTO = z.infer <typeof ChangePasswordSchema>; 
    //z.string().min(1, 'confirm ur password')
    // })
    // .refine((data => data.newPassword === data.confirmPassword), {
    //     message: "Passwords do not match",
    //     path: ["confirmPassword"]
    // })
