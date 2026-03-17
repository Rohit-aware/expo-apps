import { v } from "convex/values";
import { api } from "./_generated/api";
import { action, mutation, query } from "./_generated/server";

// 🔹 Get messages for a specific room
export const list = query({
    args: {
        roomId: v.id("rooms"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_room", (q) =>
                q.eq("roomId", args.roomId)
            )
            .order("asc")
            .collect();
    },
});

// 🔹 Send message
export const send = mutation({
    args: {
        body: v.string(),
        author: v.string(),
        roomId: v.id("rooms"),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", {
            body: args.body,
            author: args.author,
            roomId: args.roomId,
            createdAt: Date.now(),
        });
    },
});

// 🔹 Send with filter
export const sendWithFilter = action({
    args: {
        body: v.string(),
        author: v.string(),
        roomId: v.id("rooms"),
    },
    handler: async (ctx, args) => {
        if (args.body.includes("badword")) {
            throw new Error("Message blocked");
        }

        await ctx.runMutation(api.messages.send, args);
    },
});