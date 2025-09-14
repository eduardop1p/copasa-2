import z from 'zod';

export const zodSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().trim().min(1, 'Senha é obrigatória'),
});

export type BodyProtocol = z.infer<typeof zodSchema>;
