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
  const updateCarZodSchema = z.object({
    body:z.object({
        name: z.string().trim().min(1,{ message: 'Name is required' }).optional(),
        description: z.string().trim().min(1,{ message: 'Description is required' }).optional(),
        color: z.string().trim().min(1,{ message: 'Color is required' }).optional(),
        isElectric: z.boolean().optional(),
        // status: z.enum(['available', 'unavailable']).default('available'),
        features: z.array(z.string()).nonempty({ message: 'Features are required' }).optional(),
        pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }).optional(),
        // isDeleted: z.boolean().default(false),
    })
});



  export const CarValidation = {
    carZodSchema,
    updateCarZodSchema,
  };