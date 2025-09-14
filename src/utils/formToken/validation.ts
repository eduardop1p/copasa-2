import z from 'zod';

export const zodSchema = z.object({
  token: z.string().trim().min(1, 'Por favor informe o token para continuar'),
});

export type BodyProtocol = z.infer<typeof zodSchema>;
