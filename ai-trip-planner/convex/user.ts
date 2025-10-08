import {mutation} from "./_generated/server";
import {v} from "convex/values"

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        // Implement your user creation logic here
        // Example: await ctx.db.insert("users", args);
        const user=await ctx.db.query('UserTable')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect()
        
        console.log("Checking for existing user:", user);
        
        if(user?.length==0){
            const userData={
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
                subscription: "" // or set a default value as needed
            }

            console.log("Creating new user:", userData);
            const result = await ctx.db.insert('UserTable', userData);
            console.log("User created with ID:", result);
            return { ...userData, _id: result };
        } else {
            console.log("User already exists:", user[0]);
            return user[0];
        }
    }
})