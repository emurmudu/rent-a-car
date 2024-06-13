import { z } from "zod";

const userZodSchema = z.object({
    name: z.string().trim().nonempty({ message: 'Name is required' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    role: z.enum(['user', 'admin']),
    password: z.string().trim().nonempty({ message: 'Password is required' }),
    phone: z.string().trim().nonempty({ message: 'Phone number is required' }),
    address: z.string().trim().nonempty({ message: 'Address is required' }),
  });


  export default userZodSchema;