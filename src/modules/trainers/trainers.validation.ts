import { z } from "zod";

export const registerTrainerSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  bio: z.string().optional(),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
});
