import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    rooms: defineTable({
        name: v.string(),
    }),

    messages: defineTable({
        body: v.string(),
        author: v.string(),
        roomId: v.id("rooms"),
        createdAt: v.optional(v.number()),
    }).index("by_room", ["roomId", "createdAt"]),
});
