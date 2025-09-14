import z from 'zod';
export const zodSchema = z.object({
  pixName: z.string().trim().min(1, 'Nome da chave é obrigatória'),
  pixKey: z.string().trim().min(1, 'Chave é obrigatória'),
});

export type BodyProtocol = z.infer<typeof zodSchema>;
