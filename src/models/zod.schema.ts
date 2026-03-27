import {z} from 'zod';

// This is sample ZodSchema
export const createEmailSchema=z.object({
    to: z.string({error: "UserId is mandatory"}),
    subject: z.string({error: "subject is mandatory"}),
    templateID: z.string({error: "templateID is mandatory"}),
    params: z.record(z.string(),z.any()),
});

// Validate this schema using zodValidate middleware via:- validateRequestBody(createBookingSchema)