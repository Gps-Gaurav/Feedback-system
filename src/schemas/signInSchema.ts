import {z} from  'zod'

export const signImSchema = z.object({
    identifier: z.string(),
    password  : z.string(),
})