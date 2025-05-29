import { v } from "./validator.js";

// Scheme for user validation
export const userSchema = {
    name: v.string().required(),
    age: v.number().required(), 
}