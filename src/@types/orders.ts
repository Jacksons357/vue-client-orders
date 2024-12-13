import { z } from "zod"

const ordersSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  client: z.string(),
  contact: z.string(),
  product: z.string(),
  status: z.boolean().optional()
})

export type Orders = z.infer<typeof ordersSchema>