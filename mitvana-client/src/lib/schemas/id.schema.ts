import { z } from 'zod';

export const IdSchema = z.object({
    id: z.string(),
})

export type IdFormValuesType = z.infer<typeof IdSchema>;