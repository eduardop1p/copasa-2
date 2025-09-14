import z from 'zod';

import validationCPF from '@/services/validationCPF';

export const zodSchema = z.object({
  document: z
    .string()
    .trim()
    .refine(
      value => validationCPF(value),
      'Por favor informe um CPF válido para continuar'
    ),
  password: z
    .string()
    .trim()
    .min(1, 'Por favor informe sua senha para continuar'),
});

export type BodyProtocol = z.infer<typeof zodSchema>;
