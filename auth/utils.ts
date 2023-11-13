import {z} from "zod";

// SCHEMAS =================================================================================================================================
export const zSignin = z.object({
  email: z.string().email('Le courriel doit être valide'),
  password: z.string().min(3, 'Le mot de passe doit contenir au moins 3 caractères'),
});

export const zSignup = z.object({
  avatar: z.string().url('L\'url doit être valide'),
  email: z.string().email('Le courriel doit être valide'),
  forename: z.string().min(3, 'Le prénom doit contenir au moins 3 caractères'),
  password: z.string().min(3, 'Le mot de passe doit contenir au moins 3 caractères'),
  surname: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
});

// CONSTS ==================================================================================================================================
export const SIGNIN: Signin = {email: '', password: ''};
export const SIGNUP: Signup = {avatar: '', email: '', forename: '', password: '', surname: ''};

// TYPES ===================================================================================================================================
export type Signin = z.infer<typeof zSignin>;
export type Signup = z.infer<typeof zSignup>;