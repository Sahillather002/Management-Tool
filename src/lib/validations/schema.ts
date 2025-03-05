import { z } from "zod";

export const statuses = ["canceled", "done", "in-progress", "todo", "backlog"] as const;
export const labels = ["bug", "feature", "documentation"] as const;
export const priorities = ["low", "medium", "high"] as const;
export const stages = ["applied", "screening", "rejected"] as const;

// Task Schema
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
  due_date: z.date().transform((value) => new Date(value))
});

// Candidate Schema
export const candidatesSchema = z.object({
  id: z.string(),
  name: z.string(), 
  image_url: z.string().url(),
  rating: z.number().min(0).max(5),
  stages: z.string(),
  applied_role: z.string(),
  application_date: z.date().transform((value) => new Date(value)),
  attachments: z.array(z.string().url())
});

// inferred types
export type TaskType = z.infer<typeof taskSchema>;
export type CandidateType = z.infer<typeof candidatesSchema>;