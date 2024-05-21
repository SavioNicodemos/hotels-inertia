import { z } from 'zod';

export const saveHotelSchema = z.object({
  name: z.string().min(1, 'Hotel name is required'),
  image_url: z.string().min(1, 'Image URL is required').url('Invalid URL'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
  stars: z.number().min(0).max(5, 'Stars must be between 0 and 5'),
});
