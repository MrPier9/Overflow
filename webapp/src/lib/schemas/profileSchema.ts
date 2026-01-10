import z from "zod";

const required = (name: string) =>
    z
        .string()
        .trim()
        .min(1, { message: `${name} is required` });

export const profileSchema = z.object({
    displayName: required("Display Name"),
    description: required("Description")
});

export type ProfileSchema = z.input<typeof profileSchema>;