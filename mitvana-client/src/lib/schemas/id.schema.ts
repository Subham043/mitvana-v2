import { z } from 'zod';

export const IdSchema = z.object({
    _id: z.string(),
})

export type IdFormValuesType = z.infer<typeof IdSchema>;