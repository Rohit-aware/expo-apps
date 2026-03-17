import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create room
export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("rooms", {
            name: args.name,
        });
    },
});

// List rooms
export const list = query({
    handler: async (ctx) => {
        return await ctx.db.query("rooms").collect();
    },
});