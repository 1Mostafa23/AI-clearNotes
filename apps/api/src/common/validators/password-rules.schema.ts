import z from "zod";

export const passwordRules = z.string()
.min(8, 'Minimum 8 elements')
.regex(/[A-Z]/, 'At least one capital letter is required')
.regex(/[a-z]/, 'At least one lowercase letter is required')
.regex(/[!@#$%^&*]/, 'A special character is required')
