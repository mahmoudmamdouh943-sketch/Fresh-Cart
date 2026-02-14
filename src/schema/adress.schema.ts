import * as z from "zod"

export const adressSchema = z.object({
    
    city : z.string().nonempty('cant be empty'),
    details : z.string().nonempty('cant be empty'),
    phone : z.string().nonempty('cant be empty'),
  
  
})


export type adressSchemaType = z.infer<typeof adressSchema>
