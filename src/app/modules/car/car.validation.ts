import { z } from "zod";



  const carZodSchema = z.object({
    body:z.object({
        name: z.string().trim().nonempty({ message: 'Name is required' }),
        description: z.string().trim().nonempty({ message: 'Description is required' }),
        color: z.string().trim().nonempty({ message: 'Color is required' }),
        isElectric: z.boolean(),
        // status: z.enum(['available', 'unavailable']).default('available'),
        features: z.array(z.string()).nonempty({ message: 'Features are required' }),
        pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
        // isDeleted: z.boolean().default(false),
    })
});
  
  export const CarValidation = {
    carZodSchema,
  };